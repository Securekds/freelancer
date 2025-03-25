import mongoose from 'mongoose';
const { Schema } = mongoose;

const GigSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  selectedCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  selectedSubCategory: {
    type: String,  
    required: true,
  },
  selectedBudget: {
    type: String,
    required: true,
  },
  selectedSkills: {
    type: [String],
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  uploadedPhotos: {
    type: [String],
    required: false,
  },
  projectLinks: {
    type: [String],
    required: false,
  },
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open'  
  },
  gigreported: { type: Boolean, default: false }, 
}, {
  timestamps: true,
});

export default mongoose.model("Gig", GigSchema);