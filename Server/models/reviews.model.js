import mongoose from 'mongoose';
const { Schema } = mongoose;

const generalReviewSchema = new Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      ratings: {
        interactionBrilliance: {
          type: Number,
          min: 0,
          max: 5,
          required: true
        },
        engagement: {
          type: Number,
          min: 0,
          max: 5,
          required: true
        },
        craftedExcellence: {
          type: Number,
          min: 0,
          max: 5,
          required: true
        },
        domainExpertise: {
          type: Number,
          min: 0,
          max: 5,
          required: true
        }
      },
      comment: {
        type: String,
        trim: true,
        maxlength: 500
      },
      averageRating: {
        type: Number,
        default: function() {
          const r = this.ratings;
          return ((r.interactionBrilliance + r.engagement + r.craftedExcellence + r.domainExpertise) / 4).toFixed(1);
        }
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

export default mongoose.model('Review', generalReviewSchema);