import express from 'express';
import { getSubcategoriesByCategory } from '../controllers/subcategory.controller.js';

const router = express.Router();

// GET subcategories by category ID
router.get('/:categoryId', getSubcategoriesByCategory);

export default router;
