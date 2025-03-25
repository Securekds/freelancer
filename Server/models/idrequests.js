import mongoose from 'mongoose';
const { Schema } = mongoose;

const RequestsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    idImageFront: {
        type: String,
        default: '',
    },
    idImageBack: {
        type: String,
        default: '', // Stores the back side of ID proof
    },
    idVerificationStatus: {
        type: String,
        enum: ['pending', 'progress', 'accepted', 'rejected'],
        default: 'pending'
    },
    adminComment: {
        type: String,
        default: ''
    },
    idType: {
        type: String,
        enum: ['IDCard', 'Passport', 'Residense', 'DrivingLCN'], // Allowed types
        default: 'IDCard'
    },
  





}, {
    timestamps: true,
});

export default mongoose.model('Requests', RequestsSchema);

