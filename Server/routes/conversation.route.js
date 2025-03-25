import express from "express";
import {
  createConversation,
  getUserConversations, 
  markConversationAsRead,
  deleteConversation,
  findConversation,
  restoreConversation,

} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/new-conversation", createConversation);
router.get("/:userId", getUserConversations);
router.put("/:id/read", markConversationAsRead);
router.delete("/:id", deleteConversation);
router.post("/find", findConversation);
router.put("/:id/restore", restoreConversation);




export default router;
