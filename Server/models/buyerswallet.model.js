import mongoose from 'mongoose';
const { Schema } = mongoose;

const walletSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Totalbalance: { 
    type: Number, 
    default: 0.00 
  },
  Suspendbalance: { 
    type: Number, 
    default: 0.00 
  },
  Withdrawalbalance: { 
    type: Number, 
    default: 0.00 
  },
  Availablebalance: { 
    type: Number, 
    default: 0.00 
  },
});

export default mongoose.model('Wallet', walletSchema);