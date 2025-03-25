
import Projects from "../models/projects.model.js"; 
import User from '../models/user.model.js'
import Wallet from '../models/buyerswallet.model.js'
import Notification from "../models/notification.model.js";
import Conversation from "../models/conversation.model.js";
import Transaction from '../models/transaction.model.js';
import Invoice from "../models/invoice.model.js";
import mongoose from 'mongoose'



const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36
  const random = Math.random().toString(36).substring(2, 8); // Random string
  return `INV-${timestamp}-${random}`;
};




export const createProject = async (req, res) => {
  try {
    const { title, buyerId, sellerId, offerId, budget, gigId } = req.body;

    // Validate request body
    if (!title || !sellerId || !offerId || !budget || !gigId) {
      return res.status(400).json({ error: "Title, seller, offer, budget, and gigId are required" });
    }

    const buyer = await User.findById(buyerId, "firstName lastName profileImg");
    if (!buyer) return res.status(404).json({ error: "Buyer not found" });

    const seller = await User.findById(sellerId, "firstName lastName");
    if (!seller) return res.status(404).json({ error: "Seller not found" });

    // Create the new project
    const newProject = new Projects({
      title,
      buyerId,
      sellerId,
      offerId,
      budget,
      gigId,  // ✅ Store gigId in project
      members: [buyerId, sellerId],
    });

    await newProject.save();

    // ✅ Create notifications
    const sellerNotification = new Notification({
      userId: sellerId,
      sender: {
        _id: buyerId,
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        profileImg: buyer.profileImg || "", 
      },
      title: "Congratulations! Your offer has been accepted 🎉.",
      description: "offeraccepted",
      type: "projects",
      projectId: newProject._id,
      projectitel: title,
    });

    await sellerNotification.save();

    const buyerNotification = new Notification({
      userId: buyerId,
      sender: {
        _id: sellerId,
        firstName: seller.firstName,
        lastName: seller.lastName,
      },
      title: "You've Started a New Project 🚀",
      description: "buyerprojectcreated",
      type: "projects",
      projectId: newProject._id,
      projectitel: title,
    });

    await buyerNotification.save();

    // ========================
    // Send Real-Time Notifications
    // ========================
    const io = req.app.get('io'); // Get Socket.IO instance
    const onlineUsers = req.app.get('onlineUsers'); // Get online users map

    // Send notification to seller
    const sellerSocketId = onlineUsers.get(sellerId.toString());
    if (sellerSocketId) {
      const sellerNotificationObj = sellerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(sellerSocketId).emit('newNotification', sellerNotificationObj);
      console.log(`✅ Real-time notification sent to seller ${sellerId}`);
    } else {
      console.log(`📝 Seller ${sellerId} is offline. Notification will be delivered when they log in.`);
    }

    // Send notification to buyer
    const buyerSocketId = onlineUsers.get(buyerId.toString());
    if (buyerSocketId) {
      const buyerNotificationObj = buyerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(buyerSocketId).emit('newNotification', buyerNotificationObj);
      console.log(`✅ Real-time notification sent to buyer ${buyerId}`);
    } else {
      console.log(`📝 Buyer ${buyerId} is offline. Notification will be delivered when they log in.`);
    }

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
      sellerNotification,
      buyerNotification,
    });

  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Server error, could not create project" });
  }
};



export const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch projects where the user is either the buyer or the seller
    const projects = await Projects.find({
      $or: [{ buyerId: userId }, { sellerId: userId }],
    }).populate("buyerId sellerId", "firstName lastName email profileImg"); // Populate user data

    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this user" });
    }

    // Return the user's projects
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Server error, could not fetch projects" });
  }
};


export const getProjectByConversationId = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Validate conversationId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ error: "Invalid conversation ID" });
    }

    // Find the conversation to get the projectId
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Find the project associated with the projectId
    const project = await Projects.findById(conversation.projectId)
      .populate("gigId") // Fetch gig details
      .populate("buyerId", "firstName lastName profileImg") // Fetch buyer details
      .populate("sellerId", "firstName lastName profileImg"); // Fetch seller details

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by conversationId:", error);
    res.status(500).json({ error: "Server error, could not retrieve project" });
  }
};


export const sendValidationRequest = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { lastPrice, deliveryTime } = req.body;

    // Validate input data
    if (!lastPrice || !deliveryTime) {
      return res.status(400).json({ error: 'Last price and delivery time are required.' });
    }

    // Ensure lastPrice is a number
    const sanitizedLastPrice = parseFloat(lastPrice);
    if (isNaN(sanitizedLastPrice)) {
      return res.status(400).json({ error: 'Invalid last price. Must be a number.' });
    }

        // Convert to Date object and validate
        const deliveryDate = new Date(deliveryTime);
        if (isNaN(deliveryDate.getTime())) {
          return res.status(400).json({ error: 'Invalid delivery date format' });
        }
    
        // Ensure delivery is at least 24 hours in future
        if (deliveryDate < new Date(Date.now() + 86400000)) {
          return res.status(400).json({ error: 'Delivery must be at least 24 hours from now' });
        }
    

    // Find the project and populate buyer and seller details
    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg")
      .populate("sellerId", "firstName lastName profileImg");

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Check if buyerId and sellerId are populated
    if (!project.buyerId || !project.sellerId) {
      return res.status(404).json({ error: 'Buyer or seller not found.' });
    }

    // Update the project with the sanitized data
    project.lastPrice = sanitizedLastPrice; // Use sanitized lastPrice
    project.deliveryTime = deliveryDate;
    project.isBuyerNotified = true;
    project.status = "On Hold"; // Update project status
    await project.save();

    // Create a notification for the buyer
    const notification = new Notification({
      userId: project.buyerId._id,
      sender: {
        _id: project.sellerId._id,
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg || "",
      },
      title: "Action Required: Validate Seller's Final Offer 🚀",
      description: "requestbuyervalidation",
      lastPrice: sanitizedLastPrice, // Use sanitized lastPrice
      deliveryTime: deliveryTime,
      type: "projects",
    });

    await notification.save();

    // Send real-time notification
    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const buyerSocketId = onlineUsers.get(project.buyerId._id.toString());

    if (buyerSocketId) {
      const notificationObj = notification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(buyerSocketId).emit('newNotification', notificationObj);
      console.log(`✅ Real-time notification sent to buyer ${project.buyerId._id}`);
    } else {
      console.log(`📝 Buyer ${project.buyerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Send the response with the updated project and notification data
    res.status(200).json({
      message: 'Validation request sent successfully!',
      project,
      notification,
    });
  } catch (error) {
    console.error('Error sending validation request:', error);
    res.status(500).json({ error: 'Server error, could not send validation request.' });
  }
};

export const declineOffer = async (req, res) => {
  try {
    const { projectId } = req.params;
 


    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    // Find the project and populate buyer and seller details
    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg")
      .populate("sellerId", "firstName lastName profileImg");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

   
   

    project.isBuyerNotified = false; // Reset buyer notification status
    project.status = "Inactive"; // Update project status
    await project.save();

    // Create a notification for the seller
    const notification = new Notification({
      userId: project.sellerId._id, // Notify the seller
      sender: {
        _id: project.buyerId._id,
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg || "",
      },
      title: "Validation To Start The Project Has Been Declined ❌",
      description: "sellerprojectstartdeclined",
      type: "projects",
      projectId: project._id,
    });

    await notification.save();

    // Send real-time notification to the seller
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    const sellerSocketId = onlineUsers.get(project.sellerId._id.toString());

    if (sellerSocketId) {
      const notificationObj = notification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(sellerSocketId).emit("newNotification", notificationObj);
      console.log(`✅ Real-time notification sent to seller ${project.sellerId._id}`);
    } else {
      console.log(`📝 Seller ${project.sellerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Send the response
    res.status(200).json({
      message: "Offer declined successfully",
      project: {
        _id: project._id,
        status: project.status,
        isBuyerNotified: project.isBuyerNotified,
      },
    });
  } catch (error) {
    console.error("Error declining offer:", error);
    res.status(500).json({ error: "Server error, could not decline offer" });
  }
};


export const acceptOffer = async (req, res) => {
  try {
    const { projectId } = req.params;
  

    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    // Find the project and populate buyer and seller details
    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg")
      .populate("sellerId", "firstName lastName profileImg");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if validation was requested
    if (!project.isBuyerNotified) {
      return res.status(400).json({ error: "No offer to accept" });
    }

    // Find buyer's wallet
    const buyerWallet = await Wallet.findOne({ userId: project.buyerId._id });
    if (!buyerWallet) {
      return res.status(404).json({ error: "Buyer wallet not found" });
    }

   

    // Check buyer's wallet balance
    if (buyerWallet.Availablebalance < project.lastPrice) {
      return res.status(400).json({ error: "Insufficient funds in buyer's account" });
    }

    // Update buyer's wallet
    buyerWallet.Availablebalance -= project.lastPrice;
    buyerWallet.Withdrawalbalance -= project.lastPrice;
    buyerWallet.Suspendbalance += project.lastPrice;
    await buyerWallet.save();

    // Find seller's wallet
    const sellerWallet = await Wallet.findOne({ userId: project.sellerId._id });
    if (!sellerWallet) {
      return res.status(404).json({ error: "Seller wallet not found" });
    }

    // Update seller's wallet
    sellerWallet.Suspendbalance += project.lastPrice;
    sellerWallet.Totalbalance += project.lastPrice;
    await sellerWallet.save();

    // Update project status
    project.status = "In Progress";
    project.fundsHeld = true;
    project.startDate = new Date();
    project.isBuyerNotified = false;
    await project.save();

    // Create seller notification
    const sellerNotification = new Notification({
      userId: project.sellerId._id, // Notify the seller
      sender: {
        _id: project.buyerId._id,
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg || "",
      },
      title: "🎉 Your Offer Has Been Accepted! Start Working Now",
      description: "buyerprojectstartaccepted",
      type: "projects",
      lastPrice: project.lastPrice,
      projectId: project._id,
    });

    await sellerNotification.save();

    // Create buyer notification
    const buyerNotification = new Notification({
      userId: project.buyerId._id, // Notify the buyer
      sender: {
        _id: project.sellerId._id,
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg || "",
      },
      title: "🚀 Your Project Is Now in Progress!",
      description: "projectstarted",
      type: "projects",
      lastPrice: project.lastPrice,
      projectId: project._id,
    });

    await buyerNotification.save();

    // Send real-time notifications
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    // Notify seller
    const sellerSocketId = onlineUsers.get(project.sellerId._id.toString());
    if (sellerSocketId) {
      const sellerNotificationObj = sellerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });
      io.to(sellerSocketId).emit("newNotification", sellerNotificationObj);
      console.log(`✅ Real-time notification sent to seller ${project.sellerId._id}`);
    } else {
      console.log(`📝 Seller ${project.sellerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Notify buyer
    const buyerSocketId = onlineUsers.get(project.buyerId._id.toString());
    if (buyerSocketId) {
      const buyerNotificationObj = buyerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });
      io.to(buyerSocketId).emit("newNotification", buyerNotificationObj);
      console.log(`✅ Real-time notification sent to buyer ${project.buyerId._id}`);
    } else {
      console.log(`📝 Buyer ${project.buyerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Send response
    res.status(200).json({
      message: "Offer accepted successfully",
      project,
    });
  } catch (error) {
    console.error("Error accepting offer:", error);
    res.status(500).json({ error: "Server error, could not accept offer" });
  }
};


export const uploadProject = async (req, res) => {
  try {
    const { projectFileUrl } = req.body;
    const { projectId } = req.params; 

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    if (!projectFileUrl) {
      return res.status(400).json({ error: "File URL is required" });
    }

    // ✅ Update project with uploaded file URL
    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      { $set: { projectFileUrl: projectFileUrl } },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project file uploaded successfully!",
      fileUrl: updatedProject.projectFile,
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};


export const sendProjectToBuyer = async (req, res) => {
  try {
    const { projectId } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }


    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg")
      .populate("sellerId", "firstName lastName profileImg");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

   
    project.isProjectSent = true; 
    project.isProjectNeedChanges = false;
    project.status = 'In Review';
    await project.save();

   
    const notification = new Notification({
      userId: project.buyerId._id,
      sender: {
        _id: project.sellerId._id,
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg || "",
      },
      title: "🚀 Project Delivered – Review & Release Payment",
      description: "sellerprojectsent",
      type: "projects",
      projectId: project._id,
    });

    await notification.save();

 
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    const buyerSocketId = onlineUsers.get(project.buyerId._id.toString());

    if (buyerSocketId) {
      const notificationObj = notification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(buyerSocketId).emit("newNotification", notificationObj);
      console.log(`✅ Real-time notification sent to buyer ${project.buyerId._id}`);
    } else {
      console.log(`📝 Buyer ${project.buyerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Send the response
    res.status(200).json({
      message: "Project sent to buyer successfully",
    
    });
  } catch (error) {
    console.error("Error sending project to buyer:", error);
    res.status(500).json({ error: "Server error, could not send project to buyer" });
  }
};


export const releaseFunds = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Validate project ID
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    // Find the project and populate buyer and seller details
    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg email")
      .populate("sellerId", "firstName lastName profileImg email plan"); // Include seller's plan

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the project is in progress
    if (project.status !== "In Review") {
      return res.status(400).json({ error: "Project is not In Review" });
    }

    // Find buyer's wallet
    const buyerWallet = await Wallet.findOne({ userId: project.buyerId._id });
    if (!buyerWallet) {
      return res.status(404).json({ error: "Buyer wallet not found" });
    }

    // Find seller's wallet
    const sellerWallet = await Wallet.findOne({ userId: project.sellerId._id });
    if (!sellerWallet) {
      return res.status(404).json({ error: "Seller wallet not found" });
    }

    // Use the project's lastPrice for calculations
    const projectAmount = project.lastPrice;

    // Check if buyer has enough suspended balance
    if (buyerWallet.Suspendbalance < projectAmount) {
      return res.status(400).json({ error: "Insufficient suspended funds" });
    }

    // Deduct funds from buyer's wallet
    buyerWallet.Suspendbalance -= projectAmount;
    buyerWallet.Totalbalance -= projectAmount;
    await buyerWallet.save();

    // Determine platform fees based on seller's membership plan
    let platformFees;
    switch (project.sellerId.plan) {
      case "freelancerPro":
        platformFees = projectAmount * 0.07; // 7% for Freelancer Pro
        break;
      case "proPlus":
        platformFees = projectAmount * 0.04; // 4% for ProPlus
        break;
      default:
        platformFees = projectAmount * 0.12; // 12% for Free plan
    }

    const sellerProfit = projectAmount - platformFees;

    // Add funds to seller's wallet
    sellerWallet.Suspendbalance -= project.lastPrice; // Deduct the project's last price from suspended balance
    sellerWallet.Totalbalance += sellerProfit;
    sellerWallet.Withdrawalbalance += sellerProfit;
    sellerWallet.Availablebalance += sellerProfit;
    await sellerWallet.save();

    // Update project status
    project.status = "Completed";
    project.isBuyerSatisfied = true;
    await project.save();

    // Generate unique invoice numbers
    const buyerInvoiceNumber = generateInvoiceNumber();
    const sellerInvoiceNumber = generateInvoiceNumber();

    // Create invoice for buyer
    const buyerInvoice = await Invoice.create({
      buyer: project.buyerId._id,
      buyerDetails: {
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg,
        email: project.buyerId.email,
      },
      seller: project.sellerId._id,
      sellerDetails: {
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg,
        email: project.sellerId.email,
      },
      services: [
        {
          title: project.title, // Project title
          price: projectAmount, // Project last price
          quantity: 1,
        },
      ],
      currency: "USD",
      status: "paid",
      paymentMethod: "Platform",
      paymentDate: new Date(),
      invoiceNumber: buyerInvoiceNumber,
      notes: "Payment for project completion",
    });

    // Create invoice for seller
    const sellerInvoice = await Invoice.create({
      buyer: project.buyerId._id,
      buyerDetails: {
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg,
        email: project.buyerId.email,
      },
      seller: project.sellerId._id,
      sellerDetails: {
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg,
        email: project.sellerId.email,
      },
      services: [
        {
          title: project.title, // Project title
          price: sellerProfit, // Seller's profit after platform fees
          quantity: 1,
        },
      ],
      currency: "USD",
      status: "paid",
      paymentMethod: "Platform",
      paymentDate: new Date(),
      invoiceNumber: sellerInvoiceNumber,
      notes: "Payment received for project completion",
    });

    // Create transaction for buyer (Transfer)
    const buyerTransaction = await Transaction.create({
      userId: project.buyerId._id,
      type: "payment",
      amount: projectAmount,
      currency: "USD",
      status: "completed",
      method: "platform",
    });

    // Create transaction for seller (Paid)
    const sellerTransaction = await Transaction.create({
      userId: project.sellerId._id,
      type: "payment",
      amount: sellerProfit,
      currency: "USD",
      status: "completed",
      method: "platform",
    });

    // Create seller notification
    const sellerNotification = new Notification({
      userId: project.sellerId._id, // Notify the seller
      sender: {
        _id: project.buyerId._id,
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg || "",
      },
      title: "Great Job! 🎉 Your Payment Has Been Released!",
      description: "sellerfundsreleased",
      type: "projects",
      projectId: project._id,
    });

    await sellerNotification.save();

    // Create buyer notification
    const buyerNotification = new Notification({
      userId: project.buyerId._id, // Notify the buyer
      sender: {
        _id: project.sellerId._id,
        firstName: project.sellerId.firstName,
        lastName: project.sellerId.lastName,
        profileImg: project.sellerId.profileImg || "",
      },
      title: "✅ Funds Released! Project Marked as Completed",
      description: "buyerfundsreleased",
      type: "projects",
      projectId: project._id,
    });

    await buyerNotification.save();

    // Send real-time notifications
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    // Notify seller
    const sellerSocketId = onlineUsers.get(project.sellerId._id.toString());
    if (sellerSocketId) {
      const sellerNotificationObj = sellerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });
      io.to(sellerSocketId).emit("newNotification", sellerNotificationObj);
      console.log(`✅ Real-time notification sent to seller ${project.sellerId._id}`);
    } else {
      console.log(`📝 Seller ${project.sellerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Notify buyer
    const buyerSocketId = onlineUsers.get(project.buyerId._id.toString());
    if (buyerSocketId) {
      const buyerNotificationObj = buyerNotification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });
      io.to(buyerSocketId).emit("newNotification", buyerNotificationObj);
      console.log(`✅ Real-time notification sent to buyer ${project.buyerId._id}`);
    } else {
      console.log(`📝 Buyer ${project.buyerId._id} is offline. Notification will be delivered when they log in.`);
    }

    // Send response
    res.status(200).json({
      message: "Funds released successfully",
      project,
      buyerTransaction,
      sellerTransaction,
      buyerInvoice,
      sellerInvoice,
      platformFees,
      sellerProfit,
    });
  } catch (error) {
    console.error("Error releasing funds:", error);
    res.status(500).json({ error: "Server error, could not release funds" });
  }
};


export const requestChanges = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Projects.findById(projectId)
      .populate("buyerId", "firstName lastName profileImg")
      .populate("sellerId", "firstName lastName profileImg");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the buyer has already requested changes 3 times
    if (project.changeRequests >= 3) {
      return res.status(400).json({ error: "Maximum change requests reached" });
    }

    
    project.isProjectSent = false;
    project.isProjectNeedChanges = true;
    project.changeRequests += 1;
    await project.save();

    // Create notification for the seller
    const notification = new Notification({
      userId: project.sellerId._id,
      sender: {
        _id: project.buyerId._id,
        firstName: project.buyerId.firstName,
        lastName: project.buyerId.lastName,
        profileImg: project.buyerId.profileImg || "",
      },
      title: "🔧 Changes Requested – Please Review",
      description: "buyerrequestedchanges",
      type: "projects",
      projectId: project._id,
    });

    await notification.save();

    // Send real-time notification to the seller
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    const sellerSocketId = onlineUsers.get(project.sellerId._id.toString());

    if (sellerSocketId) {
      const notificationObj = notification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(sellerSocketId).emit("newNotification", notificationObj);
      console.log(`✅ Real-time notification sent to seller ${project.sellerId._id}`);
    } else {
      console.log(`📝 Seller ${project.sellerId._id} is offline. Notification will be delivered when they log in.`);
    }

    res.status(200).json({
      message: "Changes requested successfully",
      project,
    });
  } catch (error) {
    console.error("Error requesting changes:", error);
    res.status(500).json({ error: "Server error, could not request changes" });
  }
};