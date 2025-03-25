import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // ✅ Reference to User
    description: { type: String, minlength: 20, maxlength: 215, default: '' },
    selectedRole: { type: String, required: true },
    selectedSpecialization: [{ type: String }], 
    selectedLanguages: [{ type: String }], 
    workAvailability: { type: String }, 
    selectedSkills: [
        {
            skill: { type: String, required: true },
            percentage: { type: Number, min: 0, max: 100 } 
        }
    ],
    createdAt: { type: Date, default: Date.now }
});



export default mongoose.model('Profile', ProfileSchema);
