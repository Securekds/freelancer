import mongoose from "mongoose";

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  title: { type: String, required: true, trim: true },

  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", required: true },

  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", default: null }, // ✅ Chat Link

  status: {
    type: String,
    enum: ["Inactive", "In Progress" , "Completed", "On Hold", "Cancelled" ,"In Review"],
    default: "Inactive",
  },

  budget: { type: Number, required: true, min: 0 },

  fundsHeld: { type: Boolean, default: false }, 

  milestones: [
    {
      description: String,
      amount: Number,
      dueDate: Date,
      isPaid: { type: Boolean, default: false },
    },
  ],

  startDate: { type: Date, },
  endDate: { type: Date },

  progress: { type: Number, default: 0 }, // 0% - 100%
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true }, 
  projectFileUrl: { type: String,  },

  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  attachments: [{ url: String, uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }], 
  isBuyerNotified: { type: Boolean, default: false }, 
  isSellerNotified: { type: Boolean, default: false },
  isProjectSent: { type: Boolean, default: false }, 
  isBuyerSatisfayed: { type: Boolean, default: false }, 
  isSellerReviewed: { type: Boolean, default: false }, 
  isProjectNeedChanges: { type: Boolean, default: false }, 
  lastPrice: { type: Number, default: 0 }, 
  buyerResponse: { 
    type: String, 
    enum: ["Pending", "Accepted", "Declined"], 
    default: "Pending", 
  },
  changeRequests: {
    type: Number,
    default: 0,
  },
  declineReason: { type: String }, 
  deliveryTime: {
    type: Date,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Projects", ProjectSchema);


