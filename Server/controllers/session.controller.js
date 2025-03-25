import User from "../models/user.model.js";


export const getActiveSessions = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentSessionId = req.cookies.sessionId; // Get current session ID

        const user = await User.findById(userId).select("sessions");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mark the current session
        const sessions = user.sessions.map(session => ({
            ...session.toObject(),
            isCurrentSession: session.sessionId === currentSessionId
        }));

        res.json(sessions);
    } catch (error) {
        console.error("Error fetching active sessions:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const signOutSession = async (req, res) => {
    try {
        const { userId, sessionId } = req.params;
        const currentSessionId = req.cookies.sessionId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the session to be removed
        const sessionIndex = user.sessions.findIndex(
            session => session.sessionId === sessionId || session._id.toString() === sessionId
        );
        
        if (sessionIndex === -1) {
            return res.status(404).json({ message: "Session not found" });
        }

        const isCurrentSession = user.sessions[sessionIndex].sessionId === currentSessionId;

        // Remove the session
        user.sessions.splice(sessionIndex, 1);
        await user.save();

        // If it's current session or no sessions left, clear auth cookies
        if (isCurrentSession || user.sessions.length === 0) {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            res.clearCookie("sessionId", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            return res.status(200).json({ 
                message: "Logged out successfully", 
                isCurrentSession: true,
                sessions: user.sessions 
            });
        }

        res.json({ 
            message: "Session signed out successfully", 
            isCurrentSession: false, 
            sessions: user.sessions 
        });
    } catch (error) {
        console.error("Error signing out session:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const signOutAllSessions = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentSessionId = req.cookies.sessionId; // Get current session ID from cookies
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the current session is in the user's sessions
        const isCurrentSessionActive = user.sessions.some(
            session => session.sessionId === currentSessionId
        );

        // Clear all sessions and increment tokenVersion to invalidate all tokens
        user.sessions = [];
        user.tokenVersion += 1;  // ⬅️ This invalidates all existing tokens
        await user.save();

        // Clear auth cookies for the triggering device
        if (isCurrentSessionActive) {
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
            res.clearCookie("sessionId", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            });
        }

        res.status(200).json({ 
            message: "Logged out from all devices successfully", 
            sessions: user.sessions // Should be an empty array
        });
    } catch (error) {
        console.error("Error signing out from all sessions:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
