import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import Requests from "../models/idrequests.js";
import validator from 'validator';
import Profile from '../models/userprofile.model.js'
import Review from '../models/reviews.model.js'


// Function to delete a user account
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "User not found!"));
        }

        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You don't have access to delete other accounts!"));
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account Deleted!");
    } catch (error) {
        return next(createError(500, "Failed to delete account"));
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
      

        // Fetch all users from the database
        const users = await User.find({}, "-password"); // Exclude password field for security

        res.status(200).json(users);
    } catch (error) {
        return next(createError(500, "Failed to fetch users."));
    }
};


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId); // req.userId set by verifyToken
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user); // Return user data
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Function to update a user's cover image
export const updateCoverImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(createError(400, "No file uploaded!"));
        }

        // Construct file URL (assuming static serving from 'uploads' folder)
        const coverImg = `uploads/${req.file.filename}`;  // Removed leading slash


        // Find user by ID  
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Ensure only the owner can update
        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You don't have permission to update this cover!"));
        }

        // Update user's cover image
        user.coverImg = coverImg;
        await user.save();

       // Return updated user data with the new coverImg
       res.status(200).json({
        message: "Cover image updated successfully!",
        user: {
            ...user.toObject(),
            coverImg // Include the updated cover image URL
        }
    });
    } catch (error) {
        console.error('Error updating cover image:', error);
        next(createError(500, "Server error while updating the cover image."));
    }
};

// In your backend updateProfileImage handler
export const updateProfileImage = async (req, res, next) => {

 
    try {
        if (!req.file) {
            return next(createError(400, "No file uploaded!"));
        }

        // Construct file URL for the profile image
        const profileImg = `uploads/${req.file.filename}`;

        // Find user by ID  
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        // Ensure only the owner can update
        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You don't have permission to update this profile image!"));
        }

        // Update user's profile image
        user.profileImg = profileImg;
        await user.save();

        // Return the COMPLETE user object, just like the cover image endpoint
        res.status(200).json({
            message: "Profile image updated successfully!",
            user: user.toObject() // This will include ALL user fields
        });
    } catch (error) {
        console.error('Error updating profile image:', error);
        next(createError(500, "Server error while updating the profile image."));
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {


        // Extract user data from request body
        const { firstName, lastName, email, phoneNumber, country, birthMonth, birthDay, birthYear, gender } = req.body;



        // Find user by ID from the request params
        const user = await User.findById(req.params.id);


        // Check if user exists
        if (!user) {
            console.log('User not found');
            return next(createError(404, "User not found!"));
        }

        // Ensure the logged-in user is updating their own profile
        if (req.userId !== user._id.toString() && req.userId !== user.googleId && req.userId !== user.facebookId) {
            console.log('User does not have permission to update this profile');
            return next(createError(403, "You don't have permission to update this profile!"));
        }

        // Server-side validation logs
        if (firstName && !/^[A-Za-z\s]+$/.test(firstName)) {
            console.log('Invalid first name format');
            return next(createError(400, "First name can only contain letters and spaces."));
        }

        if (lastName && !/^[A-Za-z\s]+$/.test(lastName)) {
            console.log('Invalid last name format');
            return next(createError(400, "Last name can only contain letters and spaces."));
        }

        if (email && !validator.isEmail(email)) {
            console.log('Invalid email format');
            return next(createError(400, "Invalid email format."));
        }

          // Check if the new email already exists in the database
          if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log('Email already in use');
                return next(createError(400, "This email is already in use. Please use a different email."));
            }
        }

        if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
            console.log('Invalid phone number format');
            return next(createError(400, "Phone number can only contain digits."));
        }

        if (birthMonth && (birthMonth < 1 || birthMonth > 12)) {
            console.log('Invalid birth month');
            return next(createError(400, "Invalid birth month."));
        }

        if (birthDay && (birthDay < 1 || birthDay > 31)) {
            console.log('Invalid birth day');
            return next(createError(400, "Invalid birth day."));
        }

        if (birthYear && (birthYear < 1900 || birthYear > new Date().getFullYear())) {
            console.log('Invalid birth year');
            return next(createError(400, "Invalid birth year."));
        }

        // Optional: Validate gender if provided
        if (gender && !['Male', 'Female',].includes(gender)) {
            console.log('Invalid gender format');
            return next(createError(400, "Gender must be 'Male', 'Female',"));
        }


        // Update fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.country = country || user.country;
        user.birthMonth = birthMonth || user.birthMonth;
        user.birthDay = birthDay || user.birthDay;
        user.birthYear = birthYear || user.birthYear;
        user.gender = gender || user.gender;

        // Set isProfileUpdated to true
        user.isProfileUpdated = true;

        // Log updated user data
        console.log('Updated User:', user);

        // Save the updated user data
        await user.save();

        // Respond with the updated user information
        res.status(200).json({
            message: 'User profile updated successfully!',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                country: user.country,
                birthMonth: user.birthMonth,
                birthDay: user.birthDay,
                birthYear: user.birthYear,
                gender: user.gender,
                isProfileUpdated: user.isProfileUpdated



            },
        });
    } catch (error) {
        console.error('Error:', error);  // Log any server errors
        return next(createError(500, "Server error while updating user profile."));
    }
};

export const getProfileState = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            isProfileUpdated: user.isProfileUpdated || false
        });
    } catch (err) {
        next(err);
    }
};

export const updateProfileState = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isProfileUpdated: req.body.isProfileUpdated },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            isProfileUpdated: user.isProfileUpdated
        });
    } catch (err) {
        next(err);
    }
};

export  const updateVerificationStatus = async (req, res) => {
    try {
        const { idVerificationStatus } = req.body;
        const userId = req.params.id;

        // Ensure the status is valid
        const validStatuses = ['pending', 'progress', 'accepted', 'rejected'];
        if (!validStatuses.includes(idVerificationStatus)) {
            return res.status(400).json({ message: 'Invalid verification status' });
        }

        // Find user and update status
        const user = await User.findByIdAndUpdate(
            userId,
            { idVerificationStatus },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'Verification status updated successfully', user });
    } catch (error) {
        console.error('Error updating verification status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserVerificationStatus = async (req, res) => {
    try {
        if (req.userId !== req.params.id) {
            return res.status(403).json({ message: "You do not have permission to view this verification status." });
        }

        // Find the verification request by user ID
        const verificationRequest = await Requests.findOne({ userId: req.params.id });

        if (!verificationRequest) {
            return res.status(200).json([]); // Return an empty array instead of 404
        }

        // Return the status
        res.status(200).json({
            idVerificationStatus: verificationRequest.idVerificationStatus,
            adminComment: verificationRequest.adminComment || 'No comment',
        });
    } catch (error) {
        console.error("Error fetching user's verification status:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


export const enableTwoFactorAuth = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found." });
  
      let selectedMethod = null;
  
      if (user.isPhoneVerified) {
        selectedMethod = "phone";
      } else if (user.ConfirmedSecondaryEmail) {
        selectedMethod = "email";
      } else {
        return res.status(400).json({ message: "No valid 2FA method found." });
      }
  
      // Enable 2FA and set the method
      user.twoFactorEnabled = true;
      user.twoFactorMethod = selectedMethod;
      await user.save();
  
      res.json({ message: `Two-Factor Authentication enabled using ${selectedMethod}!` });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  export const disableTwoFactorAuth = async (req, res) => {
    const { userId } = req.body; // Get userId from request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Disable 2FA
        user.twoFactorEnabled = false;
        await user.save();

        res.json({ message: "Two-Factor Authentication has been disabled successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


  export const getLoginAttempts = async (req, res) => {
    try {
        const { userId } = req.params; // Get user ID from URL
        const { page = 1, limit = 3 } = req.query; // Get page and limit from query params, default to page 1 and limit 3
        console.log('Received query params:', { page, limit }); // Add this
        console.log(`Fetching login attempts for user: ${userId}, page: ${page}, limit: ${limit}`);

        const user = await User.findById(userId).select("loginAttempts");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Convert page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Calculate the start and end indices for pagination
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        console.log('Pagination calculation:', { // Add this
            pageNumber,
            limitNumber,
            startIndex,
            endIndex
        });
        
        // Slice the loginAttempts array to get the paginated results
        const paginatedLoginAttempts = user.loginAttempts.slice(startIndex, endIndex);

        // Send the paginated login attempts along with pagination metadata
        res.status(200).json({
            loginAttempts: paginatedLoginAttempts,
            currentPage: pageNumber,
            totalPages: Math.ceil(user.loginAttempts.length / limitNumber),
            totalAttempts: user.loginAttempts.length
        });
    } catch (error) {
        console.error("Error fetching login attempts:", error);
        res.status(500).json({ message: "Failed to fetch login attempts" });
    }
};


export const searchUsers = async (req, res) => {
    let query = req.query.query;
    const role = req.query.role; // Get the role parameter from the request

    console.log("🔍 Raw Search query received:", query);
    console.log("👤 Role filter:", role);

    if (!query || typeof query !== "string") {
        console.log("⚠️ Empty or invalid query detected");
        return res.status(400).json({ error: "Query is required and must be a string" });
    }

    if (!role || (role !== 'buyer' && role !== 'seller')) {
        console.log("⚠️ Invalid role parameter");
        return res.status(400).json({ error: "Valid role (buyer or seller) is required" });
    }

    query = query.trim(); // Remove unwanted spaces & newlines
    console.log("✅ Cleaned query:", query);

    // Split query into words and remove duplicates
    const words = [...new Set(query.split(/\s+/))]; // Avoid repeated searches

    try {
        // Build regex search for each unique word in firstName or lastName
        const searchCriteria = {
            $and: [
                { 
                    $or: words.map(word => ({
                        $or: [
                            { firstName: { $regex: word, $options: "i" } },
                            { lastName: { $regex: word, $options: "i" } }
                        ]
                    }))
                },
                // Add role filter: if role is 'buyer', look for isBuyer: true
                // if role is 'seller', look for isBuyer: false
                { isBuyer: role === 'buyer' ? true : false }
            ]
        };

        console.log("📌 MongoDB query:", JSON.stringify(searchCriteria, null, 2));

        // Debug: Total users count
        const totalUsers = await User.countDocuments();
        console.log("👥 Total users in database:", totalUsers);

        // Fetch users matching criteria with profileImg included
        const users = await User.find(searchCriteria).select("firstName lastName _id profileImg isBuyer");

        console.log("🔎 Search results count:", users.length);
        if (users.length === 0) {
            console.log("⚠️ No matching users found");
        }

        res.json(users);
    } catch (error) {
        console.error("❌ Error searching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .select('-password -refreshToken');
        
      if (!user) return res.status(404).json({ error: "User not found" });
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getUserBySlug = async (req, res) => {
    try {
        // Find the user using the slug
        const user = await User.findOne({ slug: req.params.slug }).select('_id firstName lastName profileImg coverImg isBuyer slug createdAt country');

        if (!user) return res.status(404).json({ message: "User not found" });

        // Fetch the profile using userId
        const profile = await Profile.findOne({ userId: user._id }).populate({
            path: 'userId',
            select: 'firstName lastName profileImg coverImg isBuyer slug createdAt country' // Only fetch these fields from User
        });

        if (!profile) return res.status(404).json({ message: "Profile not found" });

        // Fetch all reviews for the seller
        const reviews = await Review.find({ sellerId: user._id })
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

        const averageRatings = totalReviews > 0 ? {
            interactionBrilliance: (totalInteractionBrilliance / totalReviews).toFixed(1),
            engagement: (totalEngagement / totalReviews).toFixed(1),
            craftedExcellence: (totalCraftedExcellence / totalReviews).toFixed(1),
            domainExpertise: (totalDomainExpertise / totalReviews).toFixed(1),
        } : {
            interactionBrilliance: "0.0",
            engagement: "0.0",
            craftedExcellence: "0.0",
            domainExpertise: "0.0",
        };

        // Construct the response, merging user, profile, and review data
        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            isBuyer: user.isBuyer,
            slug: user.slug,
            createdAt: user.createdAt ? user.createdAt.toISOString() : null,  // Convert to ISO format
            country: user.country || "Unknown", // Ensure country is handled properly
            description: profile.description,
            selectedRole: profile.selectedRole,
            selectedSpecialization: profile.selectedSpecialization,
            selectedLanguages: profile.selectedLanguages,
            workAvailability: profile.workAvailability,
            selectedSkills: profile.selectedSkills,
            reviews, // Include individual reviews
            averageRatings // Include average ratings
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};



  
export  const createOrUpdateProfile = async (req, res) => {
    const { userId, description, selectedRole, selectedSpecialization, selectedLanguages, workAvailability, selectedSkills } = req.body;

     // Ensure the user making the request is the owner
     if (req.user.id !== userId) {
        return res.status(403).json({ message: "Unauthorized: You can only modify your own profile" });
    }



    try {
        let profile = await Profile.findOne({ userId });

        if (profile) {
         
            profile.description = description;
            profile.selectedRole = selectedRole;
            profile.selectedSpecialization = selectedSpecialization;
            profile.selectedLanguages = selectedLanguages;
            profile.workAvailability = workAvailability;
            profile.selectedSkills = selectedSkills;
        } else {
            // Create new profile
            profile = new Profile({
                userId,
                description,
                selectedRole,
                selectedSpecialization,
                selectedLanguages,
                workAvailability,
                selectedSkills
            });
        }

        await profile.save();
        res.status(200).json({ message: 'Profile saved successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Error saving profile', error: error.message });
    }
};
