// audio.routes.js
import express from "express";
import { uploadAudio } from "../controllers/audio.controller.js";
import { uploadSingleAudio } from "../utils/multerConfig.js";

const router = express.Router();

// Route to upload audio
router.post("/upload", uploadSingleAudio, uploadAudio); // ✅ Apply middleware here

export default router;