import express from "express";
import { getUserTransactions } from "../controllers/transaction.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();

router.get("/user-transactions/:userId", verifyToken, getUserTransactions);

export default router;


