import express from 'express';
import { createNewGig , getAllGigs , getGigsByCategory , getGigsBySubCategory , getFilteredGigs , getSingleGig  } from '../controllers/gig.controller.js';
import { upload } from '../utils/multerConfig.js';
import { sanitizeGigData } from '../middleware/sanitizeGig.js';
import { validateGigData } from '../middleware/validateGig.js';
import { verifyToken } from "../middleware/jwt.js";



const router = express.Router();

router.post(
    '/new-gig',
    upload.array('uploadedPhotos', 4),
    sanitizeGigData,
    validateGigData,
    createNewGig
  );

  // Fetch all gigs
router.get('/all-gigs', verifyToken , getAllGigs);
router.get('/gig/:gigId', verifyToken , getSingleGig);
router.get('/category/:categoryId' , getGigsByCategory);
router.get('/category/:categoryId/subcategory/:subCategory', verifyToken, getGigsBySubCategory);
router.get('/filter', verifyToken ,  getFilteredGigs);

    
    
    


export default router;
