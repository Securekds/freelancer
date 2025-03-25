import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sender: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    firstName: { type: String },
    lastName: { type: String },
    profileImg: { type: String },
  },
  title: { type: String, required: true },
  description: { type: String, required: false }, 
  firstName: { type: String, required: false }, 
  lastName: { type: String, required: false }, 
  projectitel: { type: String, required: false }, 
  link: { type: String, required: false }, 
  lastPrice: { type: Number, default: 0 ,required: false }, // New field
  deliveryTime: { type: String, default: "" , required: false }, // New field
  declineReason: { type: String, required: false }, 

  type: { type: String, enum: ["system", "projects", "messages" , "payments"], default: "system" },
  isRead: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Projects", default: null }, // ✅ New field
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);
