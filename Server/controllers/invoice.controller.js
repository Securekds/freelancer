import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const { buyer, seller, services, totalAmount, currency, dueDate, paymentMethod, notes } = req.body;

    // Validate buyer & seller
    const buyerExists = await User.findById(buyer);
    const sellerExists = await User.findById(seller);
    if (!buyerExists || !sellerExists) {
      return res.status(404).json({ message: "Buyer or Seller not found" });
    }

    // Generate unique invoice number
    const invoiceNumber = `INV-${uuidv4().slice(0, 8)}`;

    const newInvoice = new Invoice({
      buyer,
      seller,
      services,
      totalAmount,
      currency,
      dueDate,
      invoiceNumber,
      paymentMethod,
      notes,
    });

    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice", error: error.message });
  }
};

// Get All Invoices (For Admin)
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("buyer seller", "firstName lastName email");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error: error.message });
  }
};

// Get Invoice by ID
export const getUserInvoices = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch invoices where the user is either the buyer or the seller
    const invoices = await Invoice.find({
      $or: [{ buyer: userId }, { seller: userId }],
    })
      .populate("buyer", "firstName lastName email profileImg") // Populate buyer details
      .populate("seller", "firstName lastName email profileImg"); // Populate seller details

    res.status(200).json({ invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};


export const updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentDate } = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { status, paymentDate },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice updated successfully", invoice: updatedInvoice });
  } catch (error) {
    res.status(500).json({ message: "Error updating invoice", error: error.message });
  }
};

// Delete Invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice", error: error.message });
  }
};
