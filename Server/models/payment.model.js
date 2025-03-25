// models/Payment.model.js
import mongoose from 'mongoose';
const { Schema } = mongoose;


const PaymentSchema = new Schema({
  paymentId: { type: String, required: true, unique: true }, // PayPal payment ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  payerId: { type: String }, // PayPal payer ID
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', PaymentSchema);