import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import User from "../models/user.model.js"; // Import the User model

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken; // Assuming you store the token in cookies
    console.log('Token received:', token); // Log the received token

    if (!token) {
        console.log("No token provided"); 
        return next(createError(401, "You're not authenticated!"));
    }

    try {
        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_KEY);
        console.log('Token payload:', payload); // Log the payload to check user info

        // Fetch the user from the database
        const user = await User.findById(payload.id);
        if (!user) {
            console.log("User not found in database");
            return next(createError(404, "User not found!"));
        }

        // Check if the token version matches
        if (payload.tokenVersion !== user.tokenVersion) {
            console.log("Token version mismatch. Forcing logout.");
            return next(createError(401, "Token expired. Please log in again."));
        }

        // Attach user info to the request object
        req.user = user; // Now req.user will contain the full user object
        req.userId = payload.id; // Set userId in request
        req.isSeller = payload.isSeller; // Set isSeller if needed
        req.role = user.role; // Attach role to request

        next();
    } catch (err) {
        console.error('Token verification failed:', err); // Log the error
        return next(createError(403, "Token is not valid!"));
    }
};