import mongoose from '../dbConnection.js'; // Import the shared connection
import Category from '../models/category.model.js'; // Your category model
import dotenv from 'dotenv';

dotenv.config();

// Define categories and their subcategories
const subCategoriesMap = {
  Programming: [
    "Web Development", "App Development", "Database Development", "Software Engineering", 
    "Website Design", "CSS Design", "Javascript Development", "PHP Development",
  ],
  Design: [
    "Graphic Design", "Photoshop", "Video Production", "Logo Design", "Video Montage", 
    "Creative Design", "Design Idea", "Video Design",
  ],
  Marketing: [
    "E Marketing", "Marketing Management", "Marketing Social", "Marketing Plan", 
    "Marketing SEO", "Marketing Internet",
  ],
  Architecture: [
    "Architecture Engineering", "Architecture Interior", "Architecture Design", "Architecture Idea", 
    "Architecture 3D", "Architecture Plans",
  ],
  "Writing & Translation": [
    "Content Writing", "Writing Articles", "Content Edit", "Writing Reports", "Research Scientific", 
    "Writing Online",
  ],
  "Finance & Accounting": [
    "Financial Accounting", "Financial Evaluation", "Financial Analysis", "Financial Management", 
    "Tax Strategy", "Administrative Reports",
  ],
  "Customer Support": [
    "Customer Service", "Desk Support", "Live Chat Support", "Email Support", "Technical Support", 
    "Social Media Support",
  ],
  "Consulting & Advice": [
    "Business Consulting", "Financial Consulting", "Marketing Consulting", "IT Consulting", 
    "Human Resources Consulting", "Legal Consulting", "Environmental Consulting", "Health Consulting",
  ],
};

const categories = Object.keys(subCategoriesMap);  // Extract category names

const addCategories = async () => {
  try {
    // Loop through the categories and add them to the database with subcategories
    for (const categoryName of categories) {
      const category = new Category({
        name: categoryName,
        description: `${categoryName} related services and gigs`,
        subCategories: subCategoriesMap[categoryName], // Add subcategories here
      });

      await category.save();
      console.log(`${categoryName} added successfully with subcategories!`);
    }

    console.log('All categories with subcategories added!');
  } catch (error) {
    console.error('Error adding categories:', error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
};

addCategories();
