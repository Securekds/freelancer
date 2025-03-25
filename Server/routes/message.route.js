import express from "express";
import { addMessage, getMessages , markMessagesAsRead } from "../controllers/message.controller.js";
import { uploadSingle1 } from "../utils/multerConfig.js"; // Import Multer config



const router = express.Router();

router.post("/new-message", uploadSingle1 , addMessage);
router.get("/:conversationId", getMessages);
router.put("/mark-read", markMessagesAsRead);


export default router;
