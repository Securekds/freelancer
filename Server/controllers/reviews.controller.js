import Review from '../models/reviews.model.js';
import User from '../models/user.model.js';
import Project from '../models/projects.model.js'



export const saveUserReviews = async (req, res) => {
    const { userId, reviews } = req.body;

    try {
        if (!userId || !reviews || !Array.isArray(reviews)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // Calculate the average stars
        const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
        const averageStars = totalStars / reviews.length;

        // Save the data
        const userReview = new UserReview({
            userId,
            reviews,
            averageStars,
        });

        await userReview.save();
        res.status(201).json({ message: 'Reviews saved successfully', userReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createReview = async (req, res) => {
    try {
        const { sellerId, ratings, comment, projectId } = req.body;
        const buyerId = req.user._id; // Authenticated user's ID


        // Check if the user has already reviewed this seller
        const existingReview = await Review.findOne({ sellerId, buyerId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this seller'
            });
        }


        // Update the project's isSellerReviewed status
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { isSellerReviewed: true },
            { new: true } // Return the updated document
        );

        if (!updatedProject) {
            throw new Error('Project not found');
        }

        // Create new review
        const newReview = await Review.create({
            sellerId,
            buyerId,
            ratings,
            comment
        });

        // Update seller's average rating
        await newReview.save();



        // Fetch buyer details for the notification
        const buyer = await User.findById(buyerId);
        if (!buyer) {
            console.log("Buyer not found");
            return res.status(404).json({
                success: false,
                message: 'Buyer not found'
            });
        }

        // Create a notification for the seller
        const notification = new Notification({
            userId: sellerId, // Notify the seller
            sender: {
                firstName: buyer.firstName,
                lastName: buyer.lastName,
                profileImg: buyer.profileImg || "",
            },
            title: "⭐ New Review Received",
            description: 'sellergotreview',
            type: "system",
        });

        await notification.save();

        // Send real-time notification to the seller
        const io = req.app.get('io'); // Get Socket.IO instance
        const onlineUsers = req.app.get('onlineUsers'); // Get online users map

        // Get the seller's socket ID
        const sellerSocketId = onlineUsers.get(sellerId.toString());

        if (sellerSocketId) {
            // Convert Mongoose document to plain object and stringify ObjectIds
            const notificationObj = notification.toObject({
                virtuals: true,
                transform: (doc, ret) => {
                    ret._id = ret._id.toString();
                    return ret;
                }
            });

            // Emit the notification to the seller
            io.to(sellerSocketId).emit('newNotification', notificationObj);
            console.log(`✅ Real-time notification sent to seller ${sellerId}`);
        }

        res.status(201).json({
            success: true,
            data: newReview
        });
    } catch (error) {
        console.error('Review creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to submit review',
            error: error.message
        });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const { sellerId } = req.params;

        // Fetch all reviews for the seller
        const reviews = await Review.find({ sellerId })
            .populate('buyerId', 'firstName lastName profileImg createdAt')
            .sort({ createdAt: -1 });

        // Calculate average ratings for each category
        let totalInteractionBrilliance = 0;
        let totalEngagement = 0;
        let totalCraftedExcellence = 0;
        let totalDomainExpertise = 0;

        reviews.forEach((review) => {
            totalInteractionBrilliance += review.ratings.interactionBrilliance;
            totalEngagement += review.ratings.engagement;
            totalCraftedExcellence += review.ratings.craftedExcellence;
            totalDomainExpertise += review.ratings.domainExpertise;
        });

        const totalReviews = reviews.length;

        const averageRatings = {
            interactionBrilliance: (totalInteractionBrilliance / totalReviews).toFixed(1),
            engagement: (totalEngagement / totalReviews).toFixed(1),
            craftedExcellence: (totalCraftedExcellence / totalReviews).toFixed(1),
            domainExpertise: (totalDomainExpertise / totalReviews).toFixed(1),
        };

        res.status(200).json({
            success: true,
            data: {
                reviews, // Individual reviews
                averageRatings, // Average ratings for each category
            },
        });
    } catch (error) {
        console.error('Error fetching seller reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to fetch reviews',
            error: error.message,
        });
    }
};


export const getGeneralReviews = async (req, res) => {
    try {
        // Fetch all reviews from the GeneralReview collection
        const reviews = await Review.find();

        if (!reviews) {
            return res.status(404).json({ success: false, message: 'No reviews found' });
        }

        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

