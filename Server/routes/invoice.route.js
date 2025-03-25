import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getUserInvoices,
  updateInvoiceStatus,
  deleteInvoice,
} from "../controllers/invoice.controller.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.post("/", verifyToken , createInvoice);
router.get("/", verifyToken , getAllInvoices);
router.get("/user-invoices/:userId", verifyToken , getUserInvoices);
router.put("/:id", verifyToken ,  updateInvoiceStatus);
router.delete("/:id", verifyToken , deleteInvoice);

export default router;
