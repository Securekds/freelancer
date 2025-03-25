import paypal from '../paypal.js';
import Wallet from '../models/buyerswallet.model.js';
import Payment from '../models/payment.model.js';
import Transaction from '../models/transaction.model.js';
import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';

export const createPayment = async (req, res) => {
    const { currency, userId, amount } = req.body;

    const create_payment_json = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: 'http://localhost:5173/userdashboard/billing',
            cancel_url: 'http://localhost:5173/userdashboard/billing',
        },
        transactions: [
            {
                amount: {
                    total: amount,
                    currency: currency || 'USD',
                },
                description: `Deposit to wallet (User ID: ${userId})`,
            },
        ],
        application_context: {
            shipping_preference: 'NO_SHIPPING',
            user_action: 'commit',
            landing_page: 'BILLING',
        },
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error('PayPal Error Details:', JSON.stringify(error, null, 2));
            return res.status(error.httpStatusCode || 500).json({
                error: error.message || 'Payment creation failed',
                details: error.response || {},
                debug_id: error.debug_id || 'unknown',
            });
        }

        for (let link of payment.links) {
            if (link.rel === 'approval_url') {
                res.send({
                    approvalUrl: link.href,
                    paymentId: payment.id,
                    userId
                });
            }
        }
    });
};

export const executePayment = async (req, res) => {
    const { paymentId, payerId, userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({
            error: "Missing userId in request body"
        });
    }

    try {
        // Check if payment has already been processed
        const existingPayment = await Payment.findOne({ paymentId });
        if (existingPayment) {
            console.log(`Payment ${paymentId} has already been processed. Returning existing information.`);
            
            // Get wallet information
            const wallet = await Wallet.findOne({ userId });
            
            return res.json({
                success: true,
                message: "Payment was already processed",
                wallet: wallet ? {
                    Totalbalance: wallet.Totalbalance.toFixed(2),
                    Availablebalance: wallet.Availablebalance.toFixed(2),
                    Currency: existingPayment.currency
                } : null
            });
        }

        // 1. Validate PayPal payment
        paypal.payment.execute(paymentId, { payer_id: payerId }, async (error, paypalPayment) => {
            if (error) {
                console.error("PayPal execution error:", error);
                return res.status(500).json({
                    error: 'Payment execution failed',
                    details: error.response?.details || error.message,
                    debug_id: error.debug_id || 'unknown'
                });
            }

            // 2. Verify payment state
            if (paypalPayment.state !== 'approved') {
                return res.status(400).json({
                    error: "Payment not approved",
                    paypalState: paypalPayment.state
                });
            }

            // 3. Get transaction details
            const transaction = paypalPayment.transactions[0];
            const amount = parseFloat(transaction.amount.total);
            const currency = transaction.amount.currency;

            try {
                // Check again in case of race condition
                const doubleCheckPayment = await Payment.findOne({ paymentId });
                if (doubleCheckPayment) {
                    console.log(`Payment ${paymentId} was processed by another request. Aborting.`);
                    
                    // Get wallet information
                    const wallet = await Wallet.findOne({ userId });
                    
                    return res.json({
                        success: true,
                        message: "Payment was already processed",
                        wallet: wallet ? {
                            Totalbalance: wallet.Totalbalance.toFixed(2),
                            Availablebalance: wallet.Availablebalance.toFixed(2),
                            Currency: doubleCheckPayment.currency
                        } : null
                    });
                }

                // 4. Create a completed payment record
                const payment = await Payment.create({
                    userId,
                    paymentId: paypalPayment.id,
                    amount,
                    currency,
                    status: 'completed',
                    payerId
                });

                // 5. Create a completed transaction record
                const completedTransaction = await Transaction.create({
                    userId,
                    type: 'deposit',
                    amount,
                    currency,
                    status: 'completed',
                    method: 'paypal'
                });

                // 6. Update wallet balances
                const updatedWallet = await Wallet.findOneAndUpdate(
                    { userId },
                    {
                        $inc: {
                            Totalbalance: amount,
                            Availablebalance: amount,
                            Withdrawalbalance : amount
                        }
                    },
                    { new: true, upsert: true }
                );

                // 7. Verify wallet update
                if (!updatedWallet) {
                    console.error("Wallet update failed for user:", userId);
                    return res.status(500).json({
                        error: "Failed to update wallet balance"
                    });
                }

                // 8. Create deposit notification
                const depositNotification = new Notification({
                    userId: userId,
                    sender: {
                        _id: null,
                        firstName: "Khadamat",
                        lastName: "Platform",
                        profileImage: "/images/system-logo.png"
                    },
                    title: `Deposit Successful! 🎉 +${amount.toFixed(2)} ${currency} Added`,
                    description: "fundsadded",
                    link: `${amount.toFixed(2)} ${currency}`,
                    type: "payments",
                    isRead: false
                });

                await depositNotification.save();

                // 9. Send real-time notification if socket.io is available
                if (req.app && req.app.get) {
                    const io = req.app.get('io');
                    const onlineUsers = req.app.get('onlineUsers');
                    
                    if (io && onlineUsers) {
                        const userSocketId = onlineUsers.get(userId.toString());

                        if (userSocketId) {
                            const notificationObj = depositNotification.toObject({
                                virtuals: true,
                                transform: (doc, ret) => {
                                    ret._id = ret._id.toString();
                                  
                                    return ret;
                                }
                            });

                            io.to(userSocketId).emit('newNotification', notificationObj);
                            console.log(`💰 Deposit notification sent to user ${userId}`);
                        }
                    }
                }

                // 10. Format response
                res.json({
                    success: true,
                    wallet: {
                        Totalbalance: updatedWallet.Totalbalance.toFixed(2),
                        Availablebalance: updatedWallet.Availablebalance.toFixed(2),
                        Currency: currency
                    },
                    notification: {
                        _id: depositNotification._id,
                        title: depositNotification.title,
                        link: depositNotification.link,
                        createdAt: depositNotification.createdAt
                    }
                });

            } catch (dbError) {
                console.error("Database error:", dbError);
                res.status(500).json({
                    error: "Failed to complete payment processing",
                    message: dbError.message
                });
            }
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};  

export const createMembershipPayment = async (req, res) => {
    const { userId, membershipType } = req.body;
  
    // Validate membership type
    if (!['freelancerPro', 'proPlus'].includes(membershipType)) {
      return res.status(400).json({ error: "Invalid membership type" });
    }
  
    // Set amount based on membership type
    const amount = membershipType === 'freelancerPro' ? '7.00' : '12.00';
  
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:5173/userdashboard/membership', // Redirect after payment
        cancel_url: 'http://localhost:5173/userdashboard/membership', // Redirect if payment is canceled
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: 'USD',
          },
          description: `Membership Payment: ${membershipType} (User ID: ${userId})`,
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'commit',
        landing_page: 'BILLING',
      },
    };
  
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error('PayPal Error Details:', JSON.stringify(error, null, 2));
        return res.status(error.httpStatusCode || 500).json({
          error: error.message || 'Payment creation failed',
          details: error.response || {},
          debug_id: error.debug_id || 'unknown',
        });
      }
  
      for (let link of payment.links) {
        if (link.rel === 'approval_url') {
          res.send({
            approvalUrl: link.href,
            paymentId: payment.id,
            userId,
            membershipType,
          });
        }
      }
    });
  };


  export const executeMembershipPayment = async (req, res) => {
    const { paymentId, payerId, userId, membershipType } = req.body;
  
    if (!userId || !membershipType) {
      return res.status(400).json({
        error: "Missing userId or membershipType in request body"
      });
    }
  
    try {
      // Check if payment has already been processed
      const existingPayment = await Payment.findOne({ paymentId });
      if (existingPayment) {
        console.log(`Payment ${paymentId} has already been processed. Returning existing information.`);
        return res.json({
          success: true,
          message: "Payment was already processed",
          membershipType: existingPayment.membershipType,
        });
      }
  
      // 1. Validate PayPal payment
      paypal.payment.execute(paymentId, { payer_id: payerId }, async (error, paypalPayment) => {
        if (error) {
          console.error("PayPal execution error:", error);
          return res.status(500).json({
            error: 'Payment execution failed',
            details: error.response?.details || error.message,
            debug_id: error.debug_id || 'unknown'
          });
        }
  
        // 2. Verify payment state
        if (paypalPayment.state !== 'approved') {
          return res.status(400).json({
            error: "Payment not approved",
            paypalState: paypalPayment.state
          });
        }
  
        // 3. Get transaction details
        const transaction = paypalPayment.transactions[0];
        const amount = parseFloat(transaction.amount.total);
        const currency = transaction.amount.currency;
  
        try {
          // Check again in case of race condition
          const doubleCheckPayment = await Payment.findOne({ paymentId });
          if (doubleCheckPayment) {
            console.log(`Payment ${paymentId} was processed by another request. Aborting.`);
            return res.json({
              success: true,
              message: "Payment was already processed",
              membershipType: doubleCheckPayment.membershipType,
            });
          }
  
          // 4. Create a completed payment record
          const payment = await Payment.create({
            userId,
            paymentId: paypalPayment.id,
            amount,
            currency,
            status: 'completed',
            payerId,
            membershipType,
          });

               // 5. Create a completed transaction record
               const completedTransaction = await Transaction.create({
                userId,
                type: 'payment',
                amount,
                currency,
                status: 'completed',
                method: 'paypal'
            });
  
            const updateData = { plan: membershipType };

            if (membershipType === 'freelancerPro') {
              updateData.remainingOffersFreelancerPro = 40; // Reset to 40 for Freelancer Pro
            }
    
            const updatedUser = await User.findByIdAndUpdate(
              userId,
              updateData, // Update the user's plan and reset remainingOffersFreelancerPro
              { new: true }
            );
  
          if (!updatedUser) {
            console.error("User update failed for user:", userId);
            return res.status(500).json({
              error: "Failed to update user membership"
            });
          }
  
          // 6. Create a membership notification
          const membershipNotification = new Notification({
            userId: userId,
            sender: {
              _id: null,
              firstName: "Khadamat",
              lastName: "Platform",
              profileImage: "/images/system-logo.png"
            },
            title: '🎉 Membership Upgraded Successfully!',
            description: "membershipupgrade",
            link: membershipType,
            type: "payments",
            isRead: false
          });
  
          await membershipNotification.save();
  
          // 7. Send real-time notification if socket.io is available
          if (req.app && req.app.get) {
            const io = req.app.get('io');
            const onlineUsers = req.app.get('onlineUsers');
            
            if (io && onlineUsers) {
              const userSocketId = onlineUsers.get(userId.toString());
  
              if (userSocketId) {
                const notificationObj = membershipNotification.toObject({
                  virtuals: true,
                  transform: (doc, ret) => {
                    ret._id = ret._id.toString();
                    return ret;
                  }
                });
  
                io.to(userSocketId).emit('newNotification', notificationObj);
                console.log(`🎉 Membership notification sent to user ${userId}`);
              }
            }
          }
  
          // 8. Format response
          res.json({
            success: true,
            membershipType: updatedUser.plan,
            notification: {
              _id: membershipNotification._id,
              title: membershipNotification.title,
              link: membershipNotification.link,
              createdAt: membershipNotification.createdAt
            }
          });
  
        } catch (dbError) {
          console.error("Database error:", dbError);
          res.status(500).json({
            error: "Failed to complete payment processing",
            message: dbError.message
          });
        }
      });
  
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error.message
      });
    }
  };