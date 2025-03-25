import mongoose from 'mongoose';
const { Schema } = mongoose;
import Project from './projects.model.js'

const ConversationSchema = new Schema({
 
   sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },


   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   readBySeller : {
    type : Boolean,
    required : true,
   },
   readByBuyer : {
    type : Boolean,
    required : true,
   },
   lastMessage : {
    type : String,
    default  : "",
   },
   read: {
    type: Boolean,
    default: false
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
 // conversation.model.js
deletedFor: [{ 
  type: mongoose.Schema.Types.ObjectId, 
  ref: "User",
  index: true // Add index for better performance
}],
projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }, // New field


},{
    timestamps : true
});




export default mongoose.model("Conversation" , ConversationSchema )