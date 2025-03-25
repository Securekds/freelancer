import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Notification from "../models/notification.model.js";
import createError from "../utils/createError.js";
import { sendResetCode } from "../utils/emailSender.js";
import { sendRegistrationPassword } from '../utils/emailSender.js';
import { sendEmailVerification } from '../utils/emailSender.js'; // Import the email sending function
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import geoip from "geoip-lite";
import useragent from "express-useragent";
import { v4 as uuidv4 } from "uuid"; // Import UUID for sessionId generation
import { generateSessionId } from '../utils/sessionUtils.js';
import Wallet from '../models/buyerswallet.model.js'






const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_SECRET);




// Register Controller
export const register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, isBuyerSelected, selectedOptions } = req.body;

        // Check if required fields are missing
        if (!email || !password || !firstName || !lastName || typeof isBuyerSelected !== 'boolean') {
            return res.status(400).json({ message: 'All fields are required, and isBuyerSelected must be a boolean' });
        }

        // Additional validation for email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        // Additional validation for first and last names
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(firstName)) {
            return res.status(400).json({ message: 'First name can only contain letters and spaces.' });
        }
        if (!nameRegex.test(lastName)) {
            return res.status(400).json({ message: 'Last name can only contain letters and spaces.' });
        }

        // Additional validation for password
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        // Password strength check (contains letter, number, and special character)
        const passwordStrengthRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;
        if (!passwordStrengthRegex.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one letter, one number, and one special character.' });
        }

        // Check if selectedOptions are provided and have at least one item
        if (!selectedOptions || selectedOptions.length < 1) {
            return res.status(400).json({ message: 'At least one option must be selected.' });
        }

        // Check if email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This Email is already registered!" });
        }

        const now = Date.now();
        const MAX_ATTEMPTS = 5; // Max attempts for registration rate limiting
        const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute (system-wide)

        // Track failed registration attempts in the last minute for rate-limiting
        const failedRegisterAttemptsInLastMinute = await User.countDocuments({
            lastFailedAttempt: { $gte: new Date(now - RATE_LIMIT_DURATION) },
        });

        if (failedRegisterAttemptsInLastMinute >= MAX_ATTEMPTS) {
            return res.status(429).json({
                message: 'Too many registration attempts. Please try again later.',
            });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 12);

        // Create new user
        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,  // Store hashed password
            isBuyer: isBuyerSelected,  // Assign buyer/seller status
            selectedOptions: selectedOptions,  // Store selected options
        });

        // Save the user in the database
        const savedUser = await newUser.save();
        const newWallet = new Wallet({ userId: savedUser._id });
        // No need to specify balances - defaults to 0.00 for all fields
        await newWallet.save();
        const BASE_URL = process.env.FRONTEND_BASE; // Example: "http://localhost:5173"

        // Create default welcome notification
        const defaultNotification = new Notification({
            userId: savedUser._id,
            sender: {
                _id: null, // No specific sender, it's from the platform
                firstName: "Khadamat",
                lastName: "Platform",
                profileImage: "https://your-platform-logo-url.com/logo.png", // Platform logo
            },
            title: "Welcome to Khadamat! 🚀 Your Journey Begins Here!",
            description: "register",
            firstName: firstName,
            link: `${BASE_URL}/userdashboard/profile/settings`,
            type: "system",
            isRead: false,
        });

        await defaultNotification.save();




        // Exclude the password from the response
        const { password: _, ...userDetails } = savedUser._doc;

        // Send user details as the response
        res.status(201).json({ user: userDetails });

    } catch (err) {
        next(err);  // Forward errors to the error handler
    }
};



export const facebookAuth = async (req, res) => {
    const { code, redirectUri } = req.body; // Now you receive redirectUri from the body
    const client_id = process.env.FACEBOOK_CLIENT_ID;
    const client_secret = process.env.FACEBOOK_CLIENT_SECRET;

    console.log('Received code:', code);

    try {
        // Log the full access token request URL and parameters
        console.log("Access token request URL:", `https://graph.facebook.com/v13.0/oauth/access_token`);
        console.log("Parameters:", {
            client_id,
            redirect_uri: redirectUri, // Use the one received from the client
            client_secret,
            code,
        });

        // Request access token from Facebook
        const tokenResponse = await axios.get(
            `https://graph.facebook.com/v13.0/oauth/access_token`, {
            params: {
                client_id,
                redirect_uri: redirectUri,
                client_secret,
                code,
            },
        }
        );

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(400).json({ success: false, message: "Failed to obtain access token" });
        }

        // Retrieve user information from Facebook
        const userResponse = await axios.get(
            `https://graph.facebook.com/me`, {
            params: {
                fields: 'id,email,first_name,last_name',
                access_token: accessToken,
            },
        }
        );

        const { email, first_name, last_name, id: facebookId } = userResponse.data;

        // Check if the user exists in your database
        let user = await User.findOne({ email });

        if (!user) {
            // User doesn't exist: send user info for registration form
            return res.status(404).json({
                success: true,
                userInfo: { email, first_name, last_name, facebookId, accessToken }
            });
        } else {
            // User exists: Update Facebook ID if necessary
            if (!user.facebookId) {
                user.facebookId = facebookId;
                await user.save();
            }

            // Generate JWT for the existing user
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );

            // Send JWT in an HTTP-only cookie and return user data
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            }).status(200).json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    facebookId: user.facebookId,
                    profileImg: user.profileImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728490158/default_profile_image.png',
                    coverImg: user.coverImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728583460/MyCover_yngwcg.jpg',
                }
            });
        }
    } catch (error) {
        console.error("Error during Facebook authentication:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: "Authentication failed" });
    }
};


// Google Login
export const googleLogin = async (req, res) => {


    const { idToken } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const googleId = payload['sub'];
        const email = payload['email'];
        const firstName = payload['given_name'];
        const lastName = payload['family_name'];

        // Check for existing user by email
        let user = await User.findOne({ email });

        if (!user) {
            // If the user does not exist, return an error message
            return res.status(404).json({
                success: false,
                message: "This user doesn't exist. You have to register."
            });
        }

        // If user exists but googleId is not set, update the user
        if (!user.googleId) {
            user.googleId = googleId; // Assign the Google ID
            await user.save(); // Save the updated user
        }

        // Generate JWT token for the user
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        // Set the cookie with the token
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        }).status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                googleId: user.googleId, // Ensure the Google ID is sent in the response
                profileImg: user.profileImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728490158/default_profile_image.png', // Return default if not set
                coverImg: user.coverImg || 'https://res.cloudinary.com/damicjacf/image/upload/v1728583460/MyCover_yngwcg.jpg', // Return default if not set
            }
        });
    } catch (err) {

        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};



export const login = async (req, res, next) => {
    try {
        const email = req.body.email;

        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        console.log("User fetched:", user);
        console.log("Existing sessions before login:", user.sessions);

        const now = Date.now();
        const MAX_ACCOUNT_ATTEMPTS = 3;  // Max attempts for account lock

        // Handle account lockout
        if (user.failedLoginAttempts >= MAX_ACCOUNT_ATTEMPTS) {
            const lockoutExpiry = new Date(user.lastFailedAttempt).getTime() + 2 * 60 * 1000; // 2 minutes lockout
            if (now < lockoutExpiry) {
                return res.status(403).json({
                    message: "Your account is temporarily locked due to multiple failed login attempts. Please try again later.",
                    lockUntil: lockoutExpiry,
                });
            } else {
                // Reset failed attempts after lockout period
                user.failedLoginAttempts = 0;
                user.lockUntil = null;
                await user.save();
            }
        }

        // Check password
        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const agent = useragent.parse(userAgent);
        const locationData = geoip.lookup(ipAddress);

        // Log the login attempt (Success or Failed)
        const loginAttempt = {
            status: isCorrect ? "success" : "failed",
            timestamp: new Date(),
            ip: ipAddress,
            location: locationData ? `${locationData.city}, ${locationData.country}` : "Unknown",
            device: agent.isMobile ? "Mobile" : agent.isDesktop ? "Desktop" : "Unknown",
            browser: agent.family || "Unknown"
        };

        if (!isCorrect) {
            user.failedLoginAttempts += 1;
            user.lastFailedAttempt = new Date();
            user.loginAttempts.push(loginAttempt); // Log failed attempt
            await user.save();

            if (user.failedLoginAttempts >= MAX_ACCOUNT_ATTEMPTS) {
                user.lockUntil = new Date(now + 2 * 60 * 1000); // Lock account for 2 minutes
                await user.save();
                return res.status(403).json({
                    message: "Your account is temporarily locked due to multiple failed login attempts. Please try again in 2 minutes.",
                    lockUntil: user.lockUntil,
                });
            }

            return res.status(403).json({
                message: user.failedLoginAttempts === 2
                    ? "Warning: 1 more attempt before account lock. Reset password if needed."
                    : "Wrong password or email!",
            });
        }

        // ✅ If Two-Factor Authentication (2FA) is enabled
        if (user.twoFactorEnabled) {
            const twoFactorMethod = user.twoFactorMethod; // Either "phone" or "email"

            console.log("Two-Factor Authentication Enabled:", twoFactorMethod);

            return res.status(200).json({
                twoFactorRequired: true,
                twoFactorMethod,
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    secondaryEmail: user.secondaryEmail,
                    isBuyer: user.isBuyer,
                }
            });
        }



        // Reset failed attempts on successful login
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        // **🔹 Track Session on Login**
        const sessionId = generateSessionId(userAgent, ipAddress); // Use unique session ID

        const sessionData = {
            sessionId: sessionId,
            device: agent.isMobile ? "Mobile" : agent.isDesktop ? "Desktop" : "Unknown",
            os: agent.os ? agent.os.toString() : "Unknown",
            browser: agent.family || "Unknown",
            ip: ipAddress,
            location: locationData ? `${locationData.city}, ${locationData.country}` : "Unknown",
            loginTime: new Date(),
            lastActive: new Date(),
            userAgent
        };

        console.log("New session data:", sessionData);

        // **🔹 Check if session already exists**
        const existingSession = user.sessions.find(session =>
            session.sessionId === sessionId || // Check by sessionId
            (session.ip === ipAddress && session.userAgent === userAgent) // Check by IP and userAgent
        );

        console.log("Existing session for IP and userAgent:", existingSession);

        if (existingSession) {
            existingSession.lastActive = new Date();
        } else {
            user.sessions.push(sessionData);
        }

        // Log the successful login attempt
        user.loginAttempts.push(loginAttempt);

        await user.save();
        console.log("Updated sessions after login:", user.sessions);

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                isBuyer: user.isBuyer,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                tokenVersion: user.tokenVersion, // Include tokenVersion in the payload
            },
            process.env.JWT_KEY,
            { expiresIn: "10h" }
        );



        // Remove sensitive data before sending response
        const {
            password,
            emailCode,
            emailCodeExpiry,
            resetCode,
            resetCodeExpiry,
            failedLoginAttempts,
            lastFailedAttempt,
            lockUntil,
            ...userWithoutSensitiveData
        } = user._doc;

        res.cookie("accessToken", token, { httpOnly: true })
            .status(200)
            .json(userWithoutSensitiveData);

    } catch (err) {
        next(err);
    }
};

export const finalizeLogin = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // 1. Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // 2. Reset failed login attempts (if needed)
        user.failedLoginAttempts = 0;
        user.lockUntil = null;

        // 3. Capture current request details (IP, user agent, location)
        const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const agent = useragent.parse(userAgent);
        const locationData = geoip.lookup(ipAddress);

        // 4. Log the successful login attempt
        const loginAttempt = {
            status: "success",
            timestamp: new Date(),
            ip: ipAddress,
            location: locationData ? `${locationData.city}, ${locationData.country}` : "Unknown",
            device: agent.isMobile ? "Mobile" : agent.isDesktop ? "Desktop" : "Unknown",
            browser: agent.family || "Unknown"
        };
        user.loginAttempts.push(loginAttempt);

        // 5. Track session (using current request details)
        const sessionId = generateSessionId(userAgent, ipAddress);
        const sessionData = {
            sessionId: sessionId,
            device: agent.isMobile ? "Mobile" : agent.isDesktop ? "Desktop" : "Unknown",
            os: agent.os ? agent.os.toString() : "Unknown",
            browser: agent.family || "Unknown",
            ip: ipAddress,
            location: locationData ? `${locationData.city}, ${locationData.country}` : "Unknown",
            loginTime: new Date(),
            lastActive: new Date(),
            userAgent
        };

        // Check for existing session
        const existingSession = user.sessions.find(session =>
            session.sessionId === sessionId ||
            (session.ip === ipAddress && session.userAgent === userAgent)
        );

        if (existingSession) {
            existingSession.lastActive = new Date();
        } else {
            user.sessions.push(sessionData);
        }

        // 6. Save the user with updated sessions/login attempts
        await user.save();

        // 7. Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                isBuyer: user.isBuyer,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                tokenVersion: user.tokenVersion,
            },
            process.env.JWT_KEY,
            { expiresIn: "10h" }
        );

        // 8. Remove sensitive data before sending response
        const {
            password,
            emailCode,
            emailCodeExpiry,
            resetCode,
            resetCodeExpiry,
            failedLoginAttempts,
            lastFailedAttempt,
            lockUntil,
            ...userWithoutSensitiveData
        } = user._doc;

        // 9. Send response with token cookie
        res.cookie("accessToken", token, { httpOnly: true })
            .status(200)
            .json(userWithoutSensitiveData);

    } catch (err) {
        next(err);
    }
};

// Logout Controller
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    }).status(200).json({ message: "User has been logged out!" }); // Changed to JSON response
};

// Check Email Controller
export const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This Email is already registered!' });
        }

        // If the email is available
        return res.status(200).json({ message: 'Email is available.' });
    } catch (err) {
        next(err); // Handle any other errors
    }
};


// Request a password reset
export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    console.log('Received email:', email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(400, "Email not found"));
        }

        // Generate and save the reset code
        const code = generateResetCode();
        user.resetCode = code;
        user.resetCodeExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send reset code to the user's email
        try {
            await sendResetCode(email, code);
            console.log("Email Sent Successfully");
        } catch (emailError) {
            console.error("Email sending error:", emailError);

            // If the email sending fails due to a non-existent email
            if (emailError.response && emailError.response.includes('Address not found')) {
                return next(createError(400, "The email address is invalid or not found"));
            }

            // Other email sending errors
            throw new Error("Email sending failed");
        }

        return res.status(200).json({ message: "Reset code sent successfully" });
    } catch (error) {
        console.error("Error in requestPasswordReset:", error);
        return next(createError(500, "Failed to send reset code"));
    }
};




// Verify the reset code
export const verifyResetCode = async (req, res, next) => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            // Return a structured JSON error response
            return res.status(400).json({ message: "Email not found" });
        }

        // Check if the reset code matches and is not expired
        if (user.resetCode === code && user.resetCodeExpiry > Date.now()) {
            return res.status(200).json({ message: "Code verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid or expired code" });
        }
    } catch (error) {
        // Return a structured JSON error response for server errors
        return res.status(500).json({ message: "Server error occurred while verifying the reset code" });
    }
};

// Reset the user's password
export const resetPassword = async (req, res, next) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(400, "Email not found"));
        }

        // Update the user's password
        user.password = await hashPassword(newPassword);
        user.resetCode = null; // Clear reset code
        user.resetCodeExpiry = null; // Clear expiry date
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return next(createError(500, "Failed to reset password Try again"));
    }
};


// Controller function to send the verification email to the provided email
export const sendEmailCodeVerification = async (req, res) => {
    const { userId, email, firstName, isSecondaryEmail } = req.body;

    try {
        const emailCode = generateResetCode();
        const expiryTime = Date.now() + 2 * 60 * 1000; // Code expires in 2 minutes

        const updateFields = isSecondaryEmail
            ? { secondaryEmailToVerify: email, secondaryEmailCode: emailCode, secondaryEmailCodeExpiry: expiryTime }
            : { emailToVerify: email, emailCode: emailCode, emailCodeExpiry: expiryTime };

        await User.updateOne({ _id: userId }, { $set: updateFields });

        await sendEmailVerification(email, firstName, emailCode);

        return res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        console.error("Error sending verification email: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Controller function to verify the email code
export const verifyEmailCode = async (req, res) => {
    const { userId, code, isSecondaryEmail } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (isSecondaryEmail) {
            // Verify secondary email
            if (user.secondaryEmailCode === code) {
                user.secondaryEmail = user.secondaryEmailToVerify; // Move the email to confirmed field
                user.ConfirmedSecondaryEmail = true;
                user.secondaryEmailToVerify = undefined;
                user.secondaryEmailCode = undefined;
                user.secondaryEmailCodeExpiry = undefined;
                await user.save();
                return res.status(200).json({ message: "Secondary email verified successfully." });
            }
        } else {
            // Verify primary email
            if (user.emailCode === code) {
                user.ConfirmedEmail = true;
                user.emailToVerify = undefined;
                user.emailCode = undefined;
                user.emailCodeExpiry = undefined;
                await user.save();
                return res.status(200).json({ message: "Primary email verified successfully." });
            }
        }

        return res.status(400).json({ message: "Invalid verification code." });
    } catch (error) {
        console.error("Error verifying email code: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};





// Helper function to generate a unique reset code
const generateResetCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a number between 1000 and 9999
};


// Helper function to hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};



// Update the user's password

export const updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword, confirmNewPassword, userId } = req.body;

    try {
        console.log("Request received for user ID:", userId);
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(400, "User not found"));
        }

        // Check if the current password is correct using bcrypt.compareSync
        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
            return next(createError(400, "Current password is incorrect"));
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
            return next(createError(400, "Passwords do not match"));
        }

        // Check if new password is the same as the current password
        if (currentPassword === newPassword) {
            return next(createError(400, "New password cannot be the same as the current password"));
        }

        // Validate password strength (length, special character, and number)
        if (newPassword.length < 8) {
            return next(createError(400, "Password must be at least 8 characters long"));
        }
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const numberPattern = /\d/;
        if (!specialCharPattern.test(newPassword)) {
            return next(createError(400, "Password must contain at least one special character"));
        }
        if (!numberPattern.test(newPassword)) {
            return next(createError(400, "Password must contain at least one number"));
        }

        // Hash the new password using bcrypt.hashSync
        user.password = bcrypt.hashSync(newPassword, 12);  // 12 is the salt rounds
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Error updating password:", error);
        return next(createError(500, "Failed to update password. Please try again."));
    }
};


export const sendPhoneCodeVerification = async (req, res) => {
    const { userId, phoneNumber, countryCode } = req.body;

    try {
        const phoneCode = generateResetCode(); // Generates a 4-digit code
        const expiryTime = Date.now() + 2 * 60 * 1000; // Code expires in 2 minutes

        // Update user model with phone verification code
        await User.updateOne(
            { _id: userId },
            { $set: { phoneCode, phoneCodeExpiry: expiryTime, phoneNumber, countryCode } }
        );

        // Send SMS (You need an actual SMS provider like Twilio, Firebase, etc.)
        await sendSms(`${countryCode}${phoneNumber}`, `Your verification code is: ${phoneCode}`);

        return res.status(200).json({ message: "Verification code sent successfully." });
    } catch (error) {
        console.error("Error sending phone verification code: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export const verifyPhoneCode = async (req, res) => {
    const { userId, code } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the code matches
        if (user.phoneCode === code && Date.now() < user.phoneCodeExpiry) {
            // Phone verification successful
            user.isPhoneVerified = true;
            user.phoneCode = null; // Clear the used code
            user.phoneCodeExpiry = null;
            await user.save();

            return res.status(200).json({ message: "Phone verification successful." });
        } else {
            return res.status(400).json({ message: "Invalid or expired verification code." });
        }
    } catch (error) {
        console.error("Error verifying phone code: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


