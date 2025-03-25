import express from 'express';
import { saveUserReviews, getUserReviews , createReview , getGeneralReviews , getAllReviews  } from '../controllers/reviews.controller.js';
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

// Save reviews
router.post('/reviews',verifyToken ,  saveUserReviews);
router.post('/generalreviews', verifyToken , createReview);
router.get('/get-general-reviews', verifyToken , getGeneralReviews);
router.get("/get-totalreviews", getAllReviews);
router.get('/reviews/:sellerId', getUserReviews);

export default router;