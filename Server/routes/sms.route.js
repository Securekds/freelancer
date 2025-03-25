import express from "express";
import { sendVerificationCode , verifyOTP } from "../controllers/sms.controller.js"; 
import { verifyToken } from "../middleware/jwt.js";




const router = express.Router();


router.post("/send-verification", sendVerificationCode);
router.post("/verify-otp" ,verifyOTP);







export default router;
