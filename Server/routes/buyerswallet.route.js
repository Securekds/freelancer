import express from 'express';
import { getUserWallet } from '../controllers/buyerswallet.controller.js';
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.get('/balance/:userId', verifyToken , getUserWallet);

export default router;