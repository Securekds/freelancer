import express from "express";
import {
        register, login,
        logout, checkEmail,
        requestPasswordReset,
        verifyResetCode,
        resetPassword,
        googleLogin,
        facebookAuth,
        sendEmailCodeVerification,
        verifyEmailCode,        
        updatePassword,
        finalizeLogin,

} from "../controllers/auth.controller.js";
import { validatePasswordChange } from "../middleware/validatePasswordChange.js"; // Import the middleware
import emailValidationMiddleware from '../middleware/emailValidationMiddleware.js';
import { validateRegisterInputs } from '../middleware/validateRegisterInputs.js';
import { verifyToken } from "../middleware/jwt.js";





const router = express.Router()

router.post("/register" , validateRegisterInputs , register);
router.post("/login",  emailValidationMiddleware , login);
router.post("/logout", logout);
router.post("/finalize-login", finalizeLogin);
router.post('/check-email', checkEmail);
router.post("/request-password-reset", requestPasswordReset); // Endpoint to request a password reset code
router.post("/verify-reset-code", verifyResetCode); // Endpoint to verify the reset code
router.post("/send-email-code", verifyToken , sendEmailCodeVerification); // Endpoint to Send the Email code
router.post("/verify-email-code", verifyToken , verifyEmailCode); // Endpoint to Verify the Email code
router.post("/reset-password", resetPassword); // Endpoint to reset the user's password
router.post("/google-login", googleLogin); // New route for Google login
router.post("/facebook-auth", facebookAuth); // New route for Facebook login
router.post("/new-password", verifyToken , validatePasswordChange , updatePassword); // New route for Changing Current Password


export default router;