import Offer from '../models/offer.model.js';
import Gig from '../models/gig.model.js';
import User from '../models/user.model.js';
import Notification from "../models/notification.model.js";
import mongoose from 'mongoose';
import validator from 'validator';

export const createOffer = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: Please log in first.' });
    }
    const sellerId = req.user.id;

    // Sanitize and validate inputs using DOMPurify
    const sanitizedData = {
      projectLink: validator.trim(req.body.projectLink || ''),
      gigId: validator.trim(req.body.gigId || ''),
      offerPrice: validator.trim(req.body.offerPrice || ''),
      selectedTime: validator.trim(req.body.selectedTime || ''),
      offerComment: validator.escape(req.body.offerComment || ''), // Escape to prevent XSS
      gigOwnerId: validator.trim(req.body.gigOwnerId || ''),
    };

    // Validate gigId format
    if (!mongoose.Types.ObjectId.isValid(sanitizedData.gigId)) {
      return res.status(400).json({ message: 'Invalid gig ID provided.' });
    }

    // Check if the user is a verified seller
    const seller = await User.findById(sellerId);
    if (!seller || seller.isBuyer) {
      return res.status(403).json({ message: 'Only sellers can make offers' });
    }
    if (!seller.isVerified) {
      return res.status(403).json({ message: 'Your account must be verified to submit offers.' });
    }

    // **🟢 Offer Limit Check (Free & Freelancer Pro)**
    if (seller.plan === 'free' || seller.plan === 'freelancerPro') {
      let remainingOffers;
      if (seller.plan === 'free') {
        remainingOffers = seller.remainingOffersFree;
      } else if (seller.plan === 'freelancerPro') {
        remainingOffers = seller.remainingOffersFreelancerPro;
      }

      if (remainingOffers <= 0) {
        return res.status(400).json({ message: "You've reached your offer limit. Upgrade your plan to continue." });
      }
    }

    // Check if the seller has already submitted an offer for this gig
    const existingOffer = await Offer.findOne({ project: sanitizedData.gigId, seller: sellerId });
    if (existingOffer) {
      return res.status(400).json({ message: 'You have already submitted an offer for this gig.' });
    }

    // Check if the gig exists
    const gig = await Gig.findById(sanitizedData.gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Parse and validate the offer price
    const parsedPrice = parseFloat(sanitizedData.offerPrice.replace(/,/g, ''));
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: 'Invalid price format' });
    }

    // Create a new offer
    const newOffer = new Offer({
      project: sanitizedData.gigId,
      seller: sellerId,
      price: parsedPrice,
      timeline: sanitizedData.selectedTime,
      comment: sanitizedData.offerComment,
    });

    await newOffer.save();

    // Deduct offer count based on the user's plan
    if (seller.plan === 'free') {
      seller.remainingOffersFree -= 1;
    } else if (seller.plan === 'freelancerPro') {
      seller.remainingOffersFreelancerPro -= 1;
    }
    // No deduction for proPlus plan (unlimited offers)
    await seller.save();

    // Create a notification for the gig owner
    const notification = new Notification({
      userId: sanitizedData.gigOwnerId,
      sender: sellerId,
      title: "💼 New Offer Received on Your Project",
      link: sanitizedData.projectLink,
      description: "buyeroffersnot",
      type: "projects",
    });

    await notification.save();

    // **Send real-time notification to the buyer (gig owner)**
    const io = req.app.get('io');
    const onlineUsers = req.app.get('onlineUsers');
    const userSocketId = onlineUsers.get(sanitizedData.gigOwnerId.toString());

    if (userSocketId) {
      const notificationObj = notification.toObject({
        virtuals: true,
        transform: (doc, ret) => {
          ret._id = ret._id.toString();
          return ret;
        },
      });

      io.to(userSocketId).emit('newNotification', notificationObj);
      console.log(`✅ Real-time notification sent to buyer ${sanitizedData.gigOwnerId}`);
    } else {
      console.log(`📝 Buyer ${sanitizedData.gigOwnerId} is offline. Notification will be delivered when they log in.`);
    }

    // Return the created offer
    res.status(201).json({
      message: "Offer submitted successfully!",
      remainingOffers: seller.plan === 'proPlus' ? 'Unlimited' : seller.plan === 'free' ? seller.remainingOffersFree : seller.remainingOffersFreelancerPro,
      offer: newOffer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const checkExistingOffer = async (req, res) => {
  try {
    const { gigId, sellerId } = req.query;

    // Validate gigId and sellerId
    if (!mongoose.Types.ObjectId.isValid(gigId) || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: 'Invalid gig ID or seller ID.' });
    }

    // Check if an offer already exists for this gig and seller
    const existingOffer = await Offer.findOne({ project: gigId, seller: sellerId });

    res.status(200).json({ exists: !!existingOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Optional: Get offer count for a gig
export const getOffersCount = async (req, res) => {
  try {
    const { gigId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(gigId)) {
      return res.status(400).json({ message: 'Invalid gig ID format' });
    }

    const count = await Offer.countDocuments({ project: gigId });

    res.status(200).json({ count });
  } catch (error) {
    console.error('Error in getOffersCount:', error);
    res.status(500).json({ message: 'Failed to fetch offers count' });
  }
};


export const updateOfferStatus = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { status, userId, firstName, lastName, profileImg, gigId } = req.body; // Extract buyer details

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the selected offer and populate seller details
    const offer = await Offer.findById(offerId).populate("seller");
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // ✅ Find the gig and check if the logged-in user is the owner
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // ✅ Check if the logged-in user is the gig owner
    if (gig.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this offer!" });
    }


    // If the offer is accepted, reject all other offers for the same project
    if (status === "accepted") {
      await Offer.updateMany(
        { project: offer.project, _id: { $ne: offerId } }, // Exclude the accepted offer
        { $set: { status: "rejected" } }
      );

      // ✅ Update the gig's status to "closed"
      await Gig.findOneAndUpdate(
        { _id: gigId },
        { status: "closed" },
        { new: true } // Return the updated document
      );
    }

    // Update the selected offer status
    offer.status = status;
    await offer.save();

    // ✅ Create a notification for the seller when the offer is rejected
    let notification = null;
    if (status === "rejected") {
      notification = new Notification({
        userId: offer.seller._id, // Seller receives the notification
        sender: {
          _id: userId, // Buyer ID
          firstName: firstName,
          lastName: lastName,
          profileImg: profileImg || "", // Default empty if not available
        },
        title: "Your offer has been declined ❌.",
        description: "offerdeclined",
        firstName: offer.seller.firstName,
        type: "projects",
      });

      await notification.save();

      // ========================
      // Send Real-Time Notification
      // ========================
      const io = req.app.get('io'); // Get Socket.IO instance
      const onlineUsers = req.app.get('onlineUsers'); // Get online users map

      // Get the seller's socket ID
      const sellerSocketId = onlineUsers.get(offer.seller._id.toString());

      if (sellerSocketId) {
        // Convert Mongoose document to plain object
        const notificationObj = notification.toObject({
          virtuals: true,
          transform: (doc, ret) => {
            ret._id = ret._id.toString();
            return ret;
          },
        });

        // Emit the notification to the seller
        io.to(sellerSocketId).emit('newNotification', notificationObj);
        console.log(`✅ Real-time notification sent to seller ${offer.seller._id}`);
      } else {
        console.log(`📝 Seller ${offer.seller._id} is offline. Notification will be delivered when they log in.`);
      }
    }

    // Send the response with the updated offer status and notification data
    res.status(200).json({
      message: `Offer status updated to ${status}`,
      notification: notification || {}, // Send the notification (if exists)
    });

  } catch (error) {
    console.error("Error updating offer status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

