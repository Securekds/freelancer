import mongoose from 'mongoose';
import Subcategory from '../models/subcategory.model.js';

export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category ID format
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID format' });
    }

    // Fetch subcategories for the given category
    const subcategories = await Subcategory.find({ categoryId });

    if (subcategories.length === 0) {
      return res.status(404).json({ message: 'No subcategories found for this category' });
    }

    // Respond with the subcategories
    return res.status(200).json({
      message: 'Subcategories fetched successfully',
      subcategories,
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return res.status(500).json({
      message: 'An error occurred while fetching subcategories',
      error: error.message,
    });
  }
};
