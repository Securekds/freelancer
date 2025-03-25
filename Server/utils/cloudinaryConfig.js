import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// ✅ Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary storage settings
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'projects', // Change this to any folder name you want in Cloudinary
    resource_type: 'auto', // Automatically detects file type (image, video, etc.)
  },
});

// ✅ Create Multer upload instance
const uploadProjectFile = multer({ storage });

export { cloudinary, uploadProjectFile };
