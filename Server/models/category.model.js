import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    subCategories: { type: [String], required: true },  // Add subCategories as an array of strings
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
