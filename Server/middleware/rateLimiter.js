import rateLimit from "express-rate-limit";
import useragent from "express-useragent";

// Store request fingerprints (IP + User-Agent)
const requestFingerprint = new Map();

// Function to generate a unique fingerprint
const getFingerprint = (req) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const ua = req.useragent.source; // User-Agent header
  return `${ip}_${ua}`;
};

// General API Rate Limiter (100 requests per 2 min)
export const apiRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // Limit each fingerprint to 100 requests per window
  keyGenerator: (req) => {
    const fingerprint = getFingerprint(req);
    requestFingerprint.set(fingerprint, (requestFingerprint.get(fingerprint) || 0) + 1);
    return fingerprint;
  },
  message: "Too many requests! Please wait before trying again.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication Rate Limiter (5 attempts per min)
export const authRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each fingerprint to 5 requests per window
  keyGenerator: (req) => getFingerprint(req),
  message: "Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware to detect bots & suspicious behavior
export const detectBots = (req, res, next) => {
  if (req.useragent.isBot || req.useragent.source.includes("python") || req.useragent.source.includes("curl")) {
    return res.status(403).json({ success: false, message: "Bots are not allowed!" });
  }
  next();
};
