import express from 'express';
import { createOffer, updateOfferStatus , getOffersCount , checkExistingOffer } from '../controllers/offer.controller.js'; // Import controller functions
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();


router.post('/new-offer', verifyToken, createOffer);




router.put('/:offerId', verifyToken, updateOfferStatus);

router.get('/gig/:gigId/count', verifyToken, getOffersCount);

router.get('/check-offer',verifyToken  ,checkExistingOffer); // Add this line



export default router;
