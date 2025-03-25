// dbConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection URI from environment
const dbURI = process.env.MONGO;

// Set up mongoose connection (remove deprecated options)
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Export the mongoose connection
export default mongoose;
