import express from 'express';
import { createPayment, executePayment , createMembershipPayment , executeMembershipPayment } from '../controllers/payment.controller.js';
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post('/create-payment', createPayment);
router.post('/execute-payment', executePayment);
router.post('/create-membership-payment', verifyToken , createMembershipPayment);
router.post('/execute-membership-payment', verifyToken , executeMembershipPayment);

export default router;