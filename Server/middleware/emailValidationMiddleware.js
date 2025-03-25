// emailValidationMiddleware.js

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailValidationMiddleware = (req, res, next) => {
    const email = req.body.email;

    // Check if email exists in the request body and validate its format
    if (!email || !emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    // If valid, proceed to the next middleware or route handler
    next();
};

export default emailValidationMiddleware;
