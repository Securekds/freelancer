import Message from "../models/message.model.js";
import User from '../models/user.model.js';
import Conversation from "../models/conversation.model.js";
import mongoose from 'mongoose'




// ✅ Add a New Message
// ✅ Add a New Message
export const addMessage = async (req, res) => {
  try {
    // Extract fields from request body
    const { conversationId, senderId, text, audioUrl, duration, messageType } = req.body;
    let imageUrl = req.file ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}` : null;

    // Validate based on messageType
    if (messageType === "text" && !text) {
      return res.status(400).json({ error: "Text is required for text messages." });
    }
    if (messageType === "audio" && (!audioUrl || !duration)) {
      return res.status(400).json({ error: "Audio URL and duration are required for audio messages." });
    }
    if (messageType === "image" && !imageUrl) {
      return res.status(400).json({ error: "Image is required for image messages." });
    }

    // Find the sender (current user)
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found." });
    }

    // Check if the sender is a seller on the free plan and has remaining messages
    if (!sender.isBuyer && sender.plan === "free") {
      if (sender.remainingMessagesFree <= 0) {
        return res.status(400).json({ 
          error: "You have reached your message limit for the free plan. Upgrade to send more messages." 
        });
      }
    }

    // Create message
    const message = new Message({
      conversationId,
      senderId,
      text,
      audioUrl,
      duration,
      imageUrl,
      messageType,
    });

    // Save the message
    await message.save();

    // Deduct 1 message from the sender's remainingMessagesFree (if seller on free plan)
    if (!sender.isBuyer && sender.plan === "free") {
      sender.remainingMessagesFree -= 1;
      await sender.save();
    }

    // Get the conversation to restore participants
    const conversation = await Conversation.findById(conversationId);
    
    // Restore conversation for both participants
    await Conversation.findByIdAndUpdate(conversationId, {
      $pull: { 
        deletedFor: { 
          $in: [
            new mongoose.Types.ObjectId(senderId),
            new mongoose.Types.ObjectId(conversation.buyerId),
            new mongoose.Types.ObjectId(conversation.sellerId)
          ] 
        }
      }
    });

    // Update last message in Conversation
    let lastMessage = "New Message";
    if (messageType === "text") lastMessage = text;
    if (messageType === "audio") lastMessage = "🎤 Audio message";
    if (messageType === "image") lastMessage = "🖼️ Image message";

    await Conversation.findByIdAndUpdate(
      conversationId, 
      { lastMessage },
      { new: true }
    );

    // Populate sender details
    const populatedMessage = await Message.findById(message._id)
      .populate("senderId", "firstName lastName profileImg")
      .populate("readBy", "firstName lastName profileImg");

    // Emit socket event for real-time update
    if (req.io) {
      req.io.to(conversationId).emit("newMessage", populatedMessage);
    }

    // Return success response with remaining messages (if seller on free plan)
    res.status(201).json({
      message: populatedMessage,
      remainingMessages: !sender.isBuyer && sender.plan === "free" ? sender.remainingMessagesFree : "Unlimited",
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ 
      error: error.message,
      details: "Failed to add message. Please try again."
    });
  }
};  
// ✅ Get All Messages of a Conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.query; // Get user ID from query params

    if (!conversationId) {
      return res.status(400).json({ message: 'Conversation ID is required' });
    }

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'firstName lastName profileImg')
      .populate('readBy', 'firstName lastName profileImg')
      .sort({ createdAt: 1 });

    // Mark messages as read for the current user
    if (userId) {
      await Message.updateMany(
        {
          conversationId,
          senderId: { $ne: userId },
          readBy: { $ne: userId },
        },
        {
          $addToSet: { readBy: userId },
          $set: { read: true },
        }
      );
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    res.status(500).json({ message: error.message });
  }
};


export const markMessagesAsRead = async (req, res) => {
  try {
    const { conversationId, userId } = req.body;

    // Update all unread messages in this conversation
    const result = await Message.updateMany(
      { 
        conversationId, 
        senderId: { $ne: userId },
        read: false 
      },
      { 
        $set: { read: true },
        $addToSet: { readBy: userId }
      }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};