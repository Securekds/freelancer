import { upload } from '../utils/multerConfig.js';
import Gig from '../models/gig.model.js';
import Offer from '../models/offer.model.js';
import Category from '../models/category.model.js';




export const createNewGig = async (req, res) => {
  try {
    const uploadedFiles = req.files || [];
    const photoPaths = uploadedFiles.map(file => ({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      path: file.path.startsWith('http') ? file.path : `/uploads/${file.filename}`
    }));

    const {
      projectTitle,
      projectDescription,
      selectedCategory,
      selectedSubCategory,
      selectedBudget,
      selectedSkills,
      selectedTime,
      projectLinks,
      userId,
    } = req.body;

    // Find category by name
    const category = await Category.findOne({ name: selectedCategory });
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }

    // Validate that the subcategory exists in the category's subCategories array
    if (!category.subCategories.includes(selectedSubCategory)) {
      return res.status(400).json({
        message: `Invalid subcategory "${selectedSubCategory}" for category "${selectedCategory}"`
      });
    }

    const parsedSkills = typeof selectedSkills === 'string'
      ? JSON.parse(selectedSkills)
      : selectedSkills;

    const parsedProjectLinks = typeof projectLinks === 'string'
      ? JSON.parse(projectLinks)
      : projectLinks || [];

    const newGig = new Gig({
      userId,
      projectTitle,
      projectDescription,
      selectedCategory: category._id,
      selectedSubCategory,  // Store the subcategory string directly
      selectedBudget,
      selectedSkills: parsedSkills,
      selectedTime,
      uploadedPhotos: photoPaths.map(photo => photo.path),
      projectLinks: parsedProjectLinks,
    });

    const savedGig = await newGig.save();

    return res.status(201).json({
      message: 'Gig created successfully!',
      gig: savedGig,
    });
  } catch (error) {
    console.error('Error creating gig:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all gigs with populated category and user information
export const getAllGigs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Gigs per page (default: 10)
    const skip = (page - 1) * limit; // Calculate the number of gigs to skip

    // Step 1: Fetch gigs with pagination and populated fields
    const gigs = await Gig.find()
      .populate('selectedCategory', 'name description subCategories')
      .populate('userId') // Populate the entire user object
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip) // Skip gigs for pagination
      .limit(limit) // Limit the number of gigs per page
      .exec();

    // Step 2: Get the total number of gigs (for pagination)
    const totalGigs = await Gig.countDocuments();

    // Step 3: Get all gig IDs
    const gigIds = gigs.map((gig) => gig._id);

    // Step 4: Use aggregation to count offers for all gigs in a single query
    const offerCounts = await Offer.aggregate([
      {
        $match: { project: { $in: gigIds } }, // Match offers for the fetched gigs
      },
      {
        $group: {
          _id: '$project', // Group by gig ID
          count: { $sum: 1 }, // Count offers for each gig
        },
      },
    ]);

    // Step 5: Create a map of gig IDs to offer counts for easy lookup
    const offerCountMap = offerCounts.reduce((map, { _id, count }) => {
      map[_id.toString()] = count;
      return map;
    }, {});

    // Step 6: Attach offer counts to the gigs
    const gigsWithOfferCount = gigs.map((gig) => ({
      ...gig.toObject(), // Include all gig fields
      offerCount: offerCountMap[gig._id.toString()] || 0, // Add the offer count (default to 0 if no offers)
      selectedCategory: {
        id: gig.selectedCategory._id,
        name: gig.selectedCategory.name,
        description: gig.selectedCategory.description,
      },
    }));

    return res.status(200).json({
      message: 'Gigs fetched successfully!',
      gigs: gigsWithOfferCount,
      totalGigs, // Total number of gigs for pagination
      totalPages: Math.ceil(totalGigs / limit), // Total number of pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a single gig by ID with populated category and user information

export const getSingleGig = async (req, res) => {
  try {
    const { gigId } = req.params; // Extract gigId from URL
    console.log(`Received gigId: ${gigId}`); // Debug log

    // Validate if gigId is in a valid ObjectId format
    if (!gigId || gigId.length !== 24) {
      console.log("Invalid gigId format:", gigId);
      return res.status(400).json({ message: "Invalid gig ID format" });
    }

    // Fetch the gig with populated data
    const gig = await Gig.findById(gigId)
      .populate("selectedCategory", "name description subCategories")
      .populate("userId") // Populating user information
      .exec();

    if (!gig) {
      console.log("Gig not found for ID:", gigId);
      return res.status(404).json({ message: "Gig not found" });
    }

    // Fetch related offers in the same request
    const offers = await Offer.find({ project: gigId })
      .populate('seller', '-password -__v -updatedAt')
      .sort({ createdAt: -1 })
      .lean();

    console.log("Fetched gig from database:", gig);
    console.log(`Found ${offers.length} offers for this gig`);

    const formattedGig = {
      ...gig.toObject(),
      selectedCategory: {
        id: gig.selectedCategory?._id || null,
        name: gig.selectedCategory?.name || "Unknown",
        description: gig.selectedCategory?.description || "No description available",
      },
    };

    return res.status(200).json({
      message: "Gig fetched successfully!",
      gig: formattedGig,
      offers: offers || []
    });

  } catch (error) {
    console.error("Error fetching single gig with offers:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get gigs by category
export const getGigsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Gigs per page (default: 10)
    const skip = (page - 1) * limit; // Calculate the number of gigs to skip

    // Fetch gigs by category with pagination
    const gigs = await Gig.find({ selectedCategory: categoryId })
      .populate('selectedCategory', 'name description subCategories')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of gigs in this category
    const totalGigs = await Gig.countDocuments({ selectedCategory: categoryId });

    // Format gigs
    const formattedGigs = gigs.map(gig => ({
      ...gig.toObject(),
      selectedCategory: {
        id: gig.selectedCategory._id,
        name: gig.selectedCategory.name,
        description: gig.selectedCategory.description,
      },
    }));

    return res.status(200).json({
      message: 'Gigs fetched successfully!',
      gigs: formattedGigs,
      totalGigs, // Total number of gigs in this category
      totalPages: Math.ceil(totalGigs / limit), // Total number of pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error('Error fetching gigs by category:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get gigs by subcategory
export const getGigsBySubCategory = async (req, res) => {
  try {
    const { categoryId, subCategory } = req.params;
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Gigs per page (default: 10)
    const skip = (page - 1) * limit; // Calculate the number of gigs to skip

    // Fetch gigs by subcategory with pagination
    const gigs = await Gig.find({
      selectedCategory: categoryId,
      selectedSubCategory: subCategory,
    })
      .populate('selectedCategory', 'name description subCategories')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of gigs in this subcategory
    const totalGigs = await Gig.countDocuments({
      selectedCategory: categoryId,
      selectedSubCategory: subCategory,
    });

    // Format gigs
    const formattedGigs = gigs.map(gig => ({
      ...gig.toObject(),
      selectedCategory: {
        id: gig.selectedCategory._id,
        name: gig.selectedCategory.name,
        description: gig.selectedCategory.description,
      },
    }));

    return res.status(200).json({
      message: 'Gigs fetched successfully!',
      gigs: formattedGigs,
      totalGigs, // Total number of gigs in this subcategory
      totalPages: Math.ceil(totalGigs / limit), // Total number of pages
      currentPage: page, // Current page
    });
  } catch (error) {
    console.error('Error fetching gigs by subcategory:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get gigs with filters
export const getFilteredGigs = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      minBudget,
      maxBudget,
      skills,
      timeFrame
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      filter.selectedCategory = category;
    }

    if (subCategory) {
      filter.selectedSubCategory = subCategory;
    }

    if (minBudget || maxBudget) {
      filter.selectedBudget = {};
      if (minBudget) {
        filter.selectedBudget.$gte = minBudget;
      }
      if (maxBudget) {
        filter.selectedBudget.$lte = maxBudget;
      }
    }

    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : skills.split(',');
      filter.selectedSkills = { $in: skillsArray };
    }

    if (timeFrame) {
      filter.selectedTime = timeFrame;
    }

    const gigs = await Gig.find(filter)
      .populate('selectedCategory', 'name description subCategories')
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .exec();

    const formattedGigs = gigs.map(gig => ({
      ...gig.toObject(),
      selectedCategory: {
        id: gig.selectedCategory._id,
        name: gig.selectedCategory.name,
        description: gig.selectedCategory.description
      }
    }));

    return res.status(200).json({
      message: 'Gigs fetched successfully!',
      gigs: formattedGigs,
    });
  } catch (error) {
    console.error('Error fetching filtered gigs:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};