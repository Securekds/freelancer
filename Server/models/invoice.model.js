import mongoose from "mongoose";
const { Schema } = mongoose;

const InvoiceSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Buyer
      required: true,
    },
    buyerDetails: {
      firstName: { type: String },
      lastName: { type: String },
      profileImg: { type: String },
      email: { type: String },
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Seller
      required: true,
    },
    sellerDetails: {
      firstName: { type: String },
      lastName: { type: String },
      profileImg: { type: String },
      email: { type: String },
    },
    services: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["paypal", "stripe", "credit_card", "Platform"],
    },
    paymentDate: {
      type: Date,
    },
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
