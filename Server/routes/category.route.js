import express from 'express';
import { getCategories } from '../controllers/category.controller.js';

const router = express.Router();

// GET all categories
router.get('/', getCategories);

export default router;
