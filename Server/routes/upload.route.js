import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// ✅ Get Cloudinary Credentials from .env
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

// ✅ Route: Generate Signed Upload Signature
router.get('/sign-upload', async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // ✅ Define the parameters to include in the signature
    const params = {
      folder: 'client-projects',
      timestamp: timestamp,
      upload_preset: 'projects',
    };

    // ✅ Create the string to sign
    const stringToSign = Object.keys(params)
      .sort() // Sort keys alphabetically
      .map((key) => `${key}=${params[key]}`) // Format as key=value
      .join('&'); // Join with &

    // ✅ Generate Cloudinary Signature
    const signature = crypto
      .createHash('sha1')
      .update(stringToSign + cloudinaryApiSecret) // Append API secret
      .digest('hex');

    // ✅ Send signature + timestamp + other params to frontend
    res.json({ timestamp, signature, apiKey: cloudinaryApiKey });
  } catch (error) {
    console.error('Error generating signature:', error);
    res.status(500).json({ error: 'Failed to generate signature' });
  }
});

export default router;