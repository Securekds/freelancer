import mongoose from 'mongoose';
const { Schema } = mongoose;

const offerSchema = new Schema(
  {
   
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    // Reference to the seller who is making the offer (using 'isBuyer' to detect if they are a seller)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming the user model has an 'isBuyer' field
      required: true,
    },
    // The offer price proposed by the seller
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    // Estimated time for completion of the project
    timeline: {
      type: String,
      required: true,
    },
    // The seller's comment/proposal for the project
    comment: {
      type: String,
      required: true,
      minlength: [10, 'Comment should be at least 10 characters long'],
    },
    // Status of the offer (pending, accepted, rejected)
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    // Timestamp of offer creation
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Offer', offerSchema);

