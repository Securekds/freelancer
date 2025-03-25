import express from "express";
import {acceptOffer, releaseFunds , requestChanges , uploadProject ,sendProjectToBuyer ,createProject, getUserProjects , getProjectByConversationId , sendValidationRequest , declineOffer } from "../controllers/projects.controller.js"; 
import { verifyToken } from "../middleware/jwt.js"; // Assuming verifyToken is a middleware that checks the user's authentication status


const router = express.Router();


router.post("/create", verifyToken, createProject);


router.get("/user/:userId", verifyToken, getUserProjects);

router.get("/by-conversation/:conversationId", verifyToken , getProjectByConversationId);
router.put("/:projectId/validation-request", verifyToken , sendValidationRequest);
router.put("/:projectId/decline", verifyToken  , declineOffer);
router.put('/:projectId/accept', verifyToken, acceptOffer);
router.put("/upload/:projectId", verifyToken, uploadProject);
router.put("/:projectId/send-to-buyer", verifyToken, sendProjectToBuyer);
router.put("/:projectId/release-funds", verifyToken, releaseFunds);
router.put("/:projectId/request-changes", verifyToken, requestChanges);




export default router;
