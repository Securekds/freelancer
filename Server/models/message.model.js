import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: function () {
        return this.messageType === "text"; // Required for text messages only
      },
    },
    audioUrl: {
      type: String,
      required: function () {
        return this.messageType === "audio"; // Required for audio messages only
      },
    },
    duration: {
      type: Number,
      required: function () {
        return this.messageType === "audio"; // Required for audio messages only
      },
    },
    imageUrl: {
      type: String,
      required: function () {
        return this.messageType === "image"; // Required for image messages only
      },
    },
    messageType: {
      type: String,
      enum: ["text", "audio", "image"],
      default: "text",
      required: true,
    },
    readBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
