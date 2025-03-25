// utils/multerConfig.js
import multer from 'multer';
import path from 'path';
import fs from "fs";


// Ensure the `uploads/audio/` directory exists
const ensureAudioUploadDir = () => {
  const audioDir = "uploads/audio/";
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
};

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      ensureAudioUploadDir(); // Ensure `uploads/audio/` exists
      cb(null, "uploads/audio/");
    } else {
      cb(null, "uploads/"); // Store other files (images) in `uploads/`
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File upload filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("audio/")) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
});

// Export a specific upload middleware for single or multiple file uploads
export const uploadSingle1 = upload.single('image');
export const uploadSingle = upload.single('file');
export const uploadMultiple = upload.array('files', 10); // Limit to 10 files
export const uploadIDImages = upload.array('idImages', 2); // ✅ Accept 2 images
export const uploadSingleAudio = upload.single("audio"); // For audio (stored in `uploads/audio/`)



