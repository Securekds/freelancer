import express from "express";
import { getActiveSessions , signOutSession , signOutAllSessions } from "../controllers/session.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/active-sessions/:userId", verifyToken, getActiveSessions);
router.delete("/sessions/:userId/:sessionId",verifyToken , signOutSession); 
router.post("/sign-out-all/:userId", verifyToken  ,  signOutAllSessions);



export default router;
