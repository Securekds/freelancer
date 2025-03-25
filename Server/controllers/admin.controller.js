import User from "../models/user.model.js";
import Requests from "../models/idrequests.js";
import Notification from "../models/notification.model.js";
import createError from "../utils/createError.js";
import Offer from '../models/offer.model.js';
import Gig from '../models/gig.model.js';
import Payment from '../models/payment.model.js'
import Transaction from "../models/transaction.model.js";
import Project from '../models/projects.model.js';
import Conversation from "../models/conversation.model.js"; 
import mongoose from 'mongoose'
import Message from '../models/message.model.js';







export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You don't have access to delete other accounts!"));
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account Deleted!");
    } catch (error) {
        return next(createError(500, "Failed to delete account"));
    }
};

export const getAllUsers = async (req, res, next) => {
    try {

        
        const users = await User.find({}, "-password");

        res.status(200).json(users);
    } catch (error) {
        return next(createError(500, "Failed to fetch users."));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return user details
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const uploadIdImages = async (req, res) => {
    console.log('Received upload request:', req.body, req.files);

    const { userId, idType } = req.body; // ✅ Extract ID type

    if (!userId || !idType || !req.files || req.files.length !== 2) {
        return res.status(400).json({ message: 'User ID, ID type, and two images are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

         

        const idFrontImage = `uploads/${req.files[0].filename}`;
        const idBackImage = `uploads/${req.files[1].filename}`;

        // ✅ Create a new request in the Requests model
        const newRequest = new Requests({
            userId,
            idImageFront: idFrontImage,
            idImageBack: idBackImage,
            idVerificationStatus: "progress",
            idType,



        });

        // ✅ Save the request to the database
        await newRequest.save();

        // ✅ Link request to the user (optional)
        user.requests.push(newRequest._id);
        await user.save();

        res.status(200).json({ message: "ID images uploaded successfully.", request: newRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", error });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Requests.find().populate({
            path: "userId",
            select: "-password -resetCode -resetCodeExpiry -googleId -facebookId" // Exclude sensitive fields
        });

        if (!requests.length) {
            return res.status(404).json({ message: "No verification requests found." });
        }

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching verification requests:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


export const updateAllUsersWithStatus = async (req, res, next) => {
    try {
        const result = await User.updateMany(
            { accountStatus: { $exists: false } }, // ✅ Only users missing `accountStatus`
            { $set: { accountStatus: 'pending' } } // ✅ Default to 'pending'
        );

        res.status(200).json({
            message: `✅ Updated ${result.modifiedCount} users with accountStatus: 'pending'.`
        });
    } catch (error) {
        next(error);
    }
};

export const getPendingVerifications = async (req, res, next) => {
    try {
        const users = await User.find({ "idVerification.status": "pending" }, "-password");
        res.status(200).json(users);
    } catch (error) {
        return next(createError(500, "Failed to fetch verification requests."));
    }
};

export const approveIDVerification = async (req, res, next) => {
    try {
        // Find the verification request by user ID
        const verificationRequest = await Requests.findOne({ userId: req.params.id });

        if (!verificationRequest) {
            return next(createError(404, "Verification request not found!"));
        }

        // Update the verification request status
        verificationRequest.idVerificationStatus = "accepted";
        verificationRequest.adminComment = "ID approved by admin";
        await verificationRequest.save();

        // ✅ Update the User's isVerified field
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true }, // Set isVerified to true
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return next(createError(404, "User not found!"));
        }

        // ✅ Create a notification for the user
        const notification = new Notification({
            userId: req.params.id,
            sender: {
                _id: null, // No specific sender, it's from the platform
                firstName: "Khadamat",
                lastName: "Platform",
                profileImage: "https://your-platform-logo-url.com/logo.png", // Platform logo
            },
            title: "Your ID Verification Has Been Approved! ✅",
            description: "idaccepted",
            fullMessage:
                "Great news! Your identity verification has been successfully approved. You now have full access to all features and services on Khadamat. This verification enhances your credibility and unlocks more opportunities. Start exploring, connecting, and growing your freelancing journey with confidence!",
            firstName: verificationRequest.firstName, // Assuming this is stored in the request
            type: "system",
            isRead: false,
        });

        await notification.save(); // Save the notification in the database

            // Get access to socket.io instance and online users map
        const io = req.app.get('io');
        const onlineUsers = req.app.get('onlineUsers');  // You need to make onlineUsers available here

        // Get the socket ID of the user if they're online
        const userSocketId = onlineUsers.get(req.params.id);
        
        if (userSocketId) {
            // Send notification directly to the user
            io.to(userSocketId).emit('newNotification', notification.toObject());
            console.log(`✅ Real-time notification sent to user ${req.params.id}`);
        } else {
            console.log(`📝 User ${req.params.id} is offline. They will see the notification when they log in next.`);
        }

        res.status(200).json({ message: "User ID approved successfully, user verified, and notification sent!" });
    } catch (error) {
        console.error("Error approving ID verification:", error);
        return next(createError(500, "Failed to approve verification."));
    }
};


export const rejectIDVerification = async (req, res, next) => {
    try {
      
        // Find the verification request by user ID
        const verificationRequest = await Requests.findOne({ userId: req.params.id });

        if (!verificationRequest) {
            return next(createError(404, "Verification request not found!"));
        }

        // Update the status to "rejected"
        verificationRequest.idVerificationStatus = "rejected";
        verificationRequest.adminComment =    "ID verification rejected by admin."; // Default comment
        await verificationRequest.save();

        // Create a notification for the user
        const notification = new Notification({
            userId: req.params.id,
            sender: {
                _id: null, // No specific sender, it's from the platform
                firstName: "Khadamat",
                lastName: "Platform",
                profileImage: "https://your-platform-logo-url.com/logo.png", // Platform logo
            },
            title: "Your ID Verification Has Been Declined ❌",
            description: "idrejected",
            firstName: verificationRequest.firstName, 
            type: "system",
            isRead: false,
        });

        await notification.save(); // Save the notification in the database

           // Get access to socket.io instance and online users map
           const io = req.app.get('io');
           const onlineUsers = req.app.get('onlineUsers');  // You need to make onlineUsers available here
   
           // Get the socket ID of the user if they're online
           const userSocketId = onlineUsers.get(req.params.id);
           
           if (userSocketId) {
               // Send notification directly to the user
               io.to(userSocketId).emit('newNotification', notification.toObject());
               console.log(`✅ Real-time notification sent to user ${req.params.id}`);
           } else {
               console.log(`📝 User ${req.params.id} is offline. They will see the notification when they log in next.`);
           }

        res.status(200).json({ message: "User ID rejected successfully, and notification sent!" });
    } catch (error) {
        console.error("Error rejecting ID verification:", error);
        return next(createError(500, "Failed to reject verification."));
    }
};

export const getAllGigsForAdmin = async (req, res, next) => {
    try {
        // Get page and limit from query parameters (default to page 1 and limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        // Fetch paginated gigs with selected fields and populate user and category info
        const gigs = await Gig.find({})
            .select("projectTitle selectedCategory selectedSubCategory userId") // Select required fields
            .populate({
                path: "userId", // Populate the user info
                select: "firstName lastName _id", // Select only firstName and lastName
            })
            .populate({
                path: "selectedCategory", // Populate the category info
                select: "name", // Select only the category name
            })
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip) // Skip documents for pagination
            .limit(limit); // Limit the number of documents per page

        // Get the total number of gigs for pagination metadata
        const totalGigs = await Gig.countDocuments();

        // Fetch offers for each gig
        const gigsWithOffers = await Promise.all(
            gigs.map(async (gig) => {
                // Find all offers for this gig
                const offers = await Offer.find({ project: gig._id })
                    .populate({
                        path: "seller", // Populate the seller info
                        select: "firstName lastName _id", // Select only firstName and lastName
                    })
                    .sort({ createdAt: -1 }); // Sort by newest first

                // Format the gig object to include offers
                return {
                    _id: gig._id,
                    projectTitle: gig.projectTitle,
                    selectedCategory: gig.selectedCategory.name, // Use the category name
                    selectedSubCategory: gig.selectedSubCategory,
                    user: {
                        firstName: gig.userId.firstName,
                        lastName: gig.userId.lastName,
                    },
                    offers: offers.map((offer) => ({
                        _id: offer._id,
                        price: offer.price,
                        timeline: offer.timeline,
                        comment: offer.comment,
                        seller: {
                            firstName: offer.seller.firstName,
                            lastName: offer.seller.lastName,
                        },
                    })),
                };
            })
        );

        // Send paginated response
        res.status(200).json({
            gigs: gigsWithOffers,
            totalGigs,
            totalPages: Math.ceil(totalGigs / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error("Error fetching gigs for admin:", err);
        next(createError(500, "Failed to fetch gigs for admin"));
    }
};


export const DeleteAGig = async (req, res, next) => {
    try {
        const gigId = req.params.id;

        // Find and delete the gig
        const deletedGig = await Gig.findByIdAndDelete(gigId);
        if (!deletedGig) {
            return next(createError(404, "Gig not found!"));
        }

        // Create a notification for the gig owner
        const notification = new Notification({
            userId: deletedGig.userId, 
            sender: {
                _id: null, 
                firstName: "Khadamat",
                lastName: "Platform",
                profileImage: "https://your-platform-logo-url.com/logo.png", 
            },
            title: "Your Gig Has Been Deleted",
            description: "gigdeletebbyadmin",
            link: deletedGig.projectTitle,
            type: "system",
            isRead: false,
        });

        // Save the notification to the database
        await notification.save();

       // Send real-time notification to the gig owner
       const io = req.app.get("io");
       const onlineUsers = req.app.get("onlineUsers");
       const gigOwnerSocketId = onlineUsers.get(deletedGig.userId.toString());

       if (gigOwnerSocketId) {
           // Transform the notification object for real-time emission
           const notificationObj = notification.toObject({
               virtuals: true,
               transform: (doc, ret) => {
                   ret._id = ret._id.toString(); // Ensure _id is a string
                   return ret;
               },
           });

           // Emit the notification to the gig owner's socket
           io.to(gigOwnerSocketId).emit("newNotification", notificationObj);
           console.log(`✅ Real-time notification sent to gig owner ${deletedGig.userId}`);
       } else {
           console.log(`📝 Gig owner ${deletedGig.userId} is offline. Notification will be delivered when they log in.`);
       }

        res.status(200).json({ message: "Gig deleted successfully!" });
    } catch (err) {
        console.error("Error deleting gig:", err);
        next(createError(500, "Failed to delete gig."));
    }
};

export const deleteOffer = async (req, res, next) => {
    try {
        const offerId = req.params.offerId;
        const { projectTitle } = req.body; // Extract projectTitle from the request body


        // Find and delete the offer
        const deletedOffer = await Offer.findByIdAndDelete(offerId).populate("seller", "firstName lastName");
        if (!deletedOffer) {
            return next(createError(404, "Offer not found!"));
        }

        // Create a notification for the seller
        const notification = new Notification({
            userId: deletedOffer.seller._id, // Seller's ID
            sender: {
                _id: null, 
                firstName: "Khadamat",
                lastName: "Platform",
                profileImage: "https://your-platform-logo-url.com/logo.png", // Platform logo
            },
            title: "Your Offer Has Been Deleted",
            description: "sellerofferdeletebbyadmin",
            link: projectTitle,
            type: "system",
            isRead: false,
        });

        // Save the notification to the database
        await notification.save();

        // Send real-time notification to the seller
        const io = req.app.get("io");
        const onlineUsers = req.app.get("onlineUsers");
        const sellerSocketId = onlineUsers.get(deletedOffer.seller._id.toString());

        if (sellerSocketId) {
            const notificationObj = notification.toObject({
                virtuals: true,
                transform: (doc, ret) => {
                    ret._id = ret._id.toString(); // Ensure _id is a string
                    return ret;
                },
            });

            io.to(sellerSocketId).emit("newNotification", notificationObj);
            console.log(`✅ Real-time notification sent to seller ${deletedOffer.seller._id}`);
        }

        res.status(200).json({ message: "Offer deleted successfully!" });
    } catch (err) {
        console.error("Error deleting offer:", err);
        next(createError(500, "Failed to delete offer."));
    }
};


export const getPaymentsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const payments = await Payment.find({ userId: userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getTransactionsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };


  export const getAllProjects = async (req, res) => {
    try {
        console.log("🔍 Fetching all projects...");

        const projects = await Project.find()
            .populate("buyerId", "firstName lastName")
            .populate("sellerId", "firstName lastName")
            .sort({ createdAt: -1 }) // 👈 Sort by latest created first
            .lean();

        // Fetch conversation manually for each project
        for (let project of projects) {
            const conversation = await Conversation.findOne({ projectId: project._id }).select("_id");
            project.conversationId = conversation ? conversation._id : null;
        }

        console.log("✅ Projects fetched successfully:", projects.length, "projects found.");
        res.status(200).json({ success: true, projects });

    } catch (error) {
        console.error("❌ Error fetching projects:", error.message);
        console.error("🛠 Full error stack:", error.stack);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const getAdminConversations = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        // Fetch messages for the conversation
        const messages = await Message.find({ conversationId });

        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

};

export const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({ success: false, message: "Invalid conversation ID" });
        }

        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });

        res.status(200).json({ 
            success: true, 
            messages 
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};