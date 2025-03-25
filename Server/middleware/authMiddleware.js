import axios from "axios";
import useragent from "express-useragent";
import User from "../models/user.model.js";
import crypto from 'crypto'; // For generating unique session IDs
import { generateSessionId } from '../utils/sessionUtils.js';


// Function to get location from IP
const getLocation = async (ip) => {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        return response.data.city && response.data.country 
            ? `${response.data.city}, ${response.data.country}` 
            : "Unknown";
    } catch (error) {
        return "Unknown";
    }
};



export const trackSession = async (req, res, next) => {
    if (req.user) {
        const userId = req.user.id;
        const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const agent = useragent.parse(userAgent);

        try {
            const location = await getLocation(ipAddress);
            
            // Generate a unique session identifier
            const sessionId = generateSessionId(userAgent, ipAddress);

            const sessionData = {
                sessionId: sessionId,
                device: agent.isMobile ? "Mobile" : agent.isDesktop ? "Desktop" : "Unknown",
                os: agent.os ? agent.os.toString() : "Unknown", // Fix: Check before using toString()
                browser: agent.browser || "Unknown", // Fix: Use fallback if browser is undefined
                ip: ipAddress,
                location: location,
                loginTime: new Date(),
                lastActive: new Date(),
                userAgent: userAgent
            };
            

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if a session with the same sessionId exists
            const existingSession = user.sessions.find(session => 
                session.sessionId === sessionId || 
                (session.ip === ipAddress && 
                 session.userAgent === userAgent)
            );

            if (existingSession) {
                existingSession.lastActive = new Date();
            } else {
                user.sessions.push(sessionData);
            }

            await user.save();

            // Store sessionId in cookie for future reference
            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

        } catch (error) {
            console.error("Error tracking session:", error);
        }
    }
    next();
};