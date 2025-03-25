import mongoose from 'mongoose';
const { Schema } = mongoose;



const transactionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice", },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project",  }, 
    type: { type: String, enum: ['deposit', 'withdrawal', 'payment', 'refund'], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    method: { type: String, enum: ['paypal', 'stripe', 'wallet', 'platform'], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
    