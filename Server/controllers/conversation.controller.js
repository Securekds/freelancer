import Conversation from "../models/conversation.model.js";
import mongoose from 'mongoose'

export const createConversation = async (req, res) => {
  try {
    const { sellerId, buyerId, projectId } = req.body;

    console.log("Request Body:", req.body);

    // Validate that all IDs are provided
    if (!sellerId || !buyerId || !projectId) {
      return res.status(400).json({ message: "sellerId, buyerId, and projectId are required." });
    }

    // Validate ObjectId format
    if (
      !mongoose.Types.ObjectId.isValid(sellerId) ||
      !mongoose.Types.ObjectId.isValid(buyerId) ||
      !mongoose.Types.ObjectId.isValid(projectId)
    ) {
      return res.status(400).json({ message: "Invalid sellerId, buyerId, or projectId." });
    }

    // Convert IDs to ObjectId
    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);
    const buyerObjectId = new mongoose.Types.ObjectId(buyerId);
    const projectObjectId = new mongoose.Types.ObjectId(projectId);

    // Check if a conversation already exists for this project
    let conversation = await Conversation.findOne({
      sellerId: sellerObjectId,
      buyerId: buyerObjectId,
      projectId: projectObjectId,
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        sellerId: sellerObjectId,
        buyerId: buyerObjectId,
        projectId: projectObjectId,
        readByBuyer: false,
        readBySeller: false,
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in createConversation:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { sellerId: new mongoose.Types.ObjectId(userId) },
                { buyerId: new mongoose.Types.ObjectId(userId) }
              ]
            },
            { deletedFor: { $ne: new mongoose.Types.ObjectId(userId) } }
          ]
        }
      },
      {
        $lookup: {
          from: 'messages',
          let: { 
            conversationId: '$_id',
            userId: new mongoose.Types.ObjectId(userId)
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$conversationId', '$$conversationId'] },
                    { $ne: ['$senderId', '$$userId'] },
                    { $eq: ['$read', false] }
                  ]
                }
              }
            }
          ],
          as: 'unreadMessages'
        }
      },
      {
        $addFields: {
          unreadCount: { $size: '$unreadMessages' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sellerId',
          foreignField: '_id',
          as: 'sellerDetails'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'buyerId',
          foreignField: '_id',
          as: 'buyerDetails'
        }
      },
      {
        $addFields: {
          sellerId: { $arrayElemAt: ['$sellerDetails', 0] },
          buyerId: { $arrayElemAt: ['$buyerDetails', 0] }
        }
      },
      {
        $project: {
          unreadMessages: 0,
          sellerDetails: 0,
          buyerDetails: 0,
          'sellerId.password': 0,
          'buyerId.password': 0
        }
      }
    ]);

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const markConversationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const conversation = await Conversation.findById(id);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    if (conversation.sellerId === userId) {
      conversation.readBySeller = true;
    } else if (conversation.buyerId === userId) {
      conversation.readByBuyer = true;
    }

    await conversation.save();
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Add user to deletedFor array instead of actual deletion
    const updatedConv = await Conversation.findByIdAndUpdate(
      id,
      { $addToSet: { deletedFor: userId } },
      { new: true }
    );

    res.status(200).json(updatedConv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const restoreConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { $pull: { deletedFor: userId } },
      { new: true }
    ).populate('sellerId buyerId');

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findConversation = async (req, res) => {
  try {
    const { sellerId, buyerId } = req.body;

    const conversation = await Conversation.findOne({
      $or: [
        { sellerId, buyerId },
        { sellerId: buyerId, buyerId: sellerId }
      ]
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



