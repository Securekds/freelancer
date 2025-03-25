    import mongoose from 'mongoose';
    const { Schema } = mongoose;

    const rankSchema = new Schema({
        rankNumber: {
            type: String,
            required: true
        },
        rankName: {
            type: String,
            required: true
        },
        rankLevel: {
            type: String,
            required: true
        },
        icon: {
            type: String, // Store the icon as a string (e.g., the icon's name or path to an image)
            required: true
        },
        icon1: {
            type: String, // Store the secondary icon as a string
            required: true
        },
        description: {
            type: String, 
            default: ""
        },
        bgColor: {
            type: String,
            required: true
        },
        iconColor: {
            type: String,
            required: true
        },
        progressbar: {
            type: String,
            required: true
        },
        coinsColor: {
            type: String,
            required: true
        },
        achievements: [
            {
                description: {
                    type: String,
                    required: true
                },
                points: {
                    type: Number,
                    required: true
                },
                completed: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        pointsRange: {
            min: {
                type: Number,
                required: true,
                default: 0
            },
            max: {
                type: Number,
                required: true,
                default: 500
            }
        },
        levelAch: {
            type: String,
            required: true
        },
        totalPoints: {
            type: Number,
            required: true,
            default: 500
        },
        pointNumbers: {
            type: String, 
            required: true
        },
        reward: {
            type: String,
            required: true
        }
    }, { timestamps: true });

    export default mongoose.model('Rank', rankSchema);