import crypto from 'crypto';

// Function to generate a unique session identifier
export const generateSessionId = (userAgent, ip) => {
    const data = `${userAgent}-${ip}-${Date.now()}`;
    return crypto.createHash('md5').update(data).digest('hex');
};