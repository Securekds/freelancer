import { body, validationResult } from "express-validator";

export const validateGigData = [
  // Validate required fields
  body("userId").notEmpty().withMessage("The 'userId' field is required."),
  body("projectTitle")
    .notEmpty()
    .withMessage("The 'projectTitle' field is required.")
    .isLength({ min: 5, max: 100 })
    .withMessage("The 'projectTitle' must be between 5 and 100 characters."),
  body("projectDescription")
    .notEmpty()
    .withMessage("The 'projectDescription' field is required.")
    .isLength({ min: 20, max: 1000 })
    .withMessage("The 'projectDescription' must be between 20 and 1000 characters."),
  body("selectedCategory").notEmpty().withMessage("The 'selectedCategory' field is required."),
  body("selectedSubCategory").notEmpty().withMessage("The 'selectedSubCategory' field is required."),

  // Validate selectedBudget (String, but cannot be "0" or below 0)
  body("selectedBudget")
    .notEmpty()
    .withMessage("The 'selectedBudget' field is required.")
    .custom((value) => {
      // Remove commas before parsing
      const cleanedValue = value.replace(/,/g, "").trim();

      // Check if it's a range format (e.g., "100 - 500$")
      const rangeMatch = cleanedValue.match(/^(\d+)\s*-\s*(\d+)\s*\$$/);
      if (rangeMatch) {
        const minValue = parseInt(rangeMatch[1], 10);
        const maxValue = parseInt(rangeMatch[2], 10);
        if (minValue <= 0 || maxValue <= 0) {
          throw new Error("Budget values must be greater than 0.");
        }
        if (minValue > maxValue) {
          throw new Error("Invalid budget range: min value cannot be greater than max value.");
        }
        return true;
      }

      // Check if it's a single value (e.g., "500$")
      const singleMatch = cleanedValue.match(/^(\d+)\s*\$$/);
      if (singleMatch) {
        const budgetValue = parseInt(singleMatch[1], 10);
        if (budgetValue <= 0) {
          throw new Error("Budget must be greater than 0.");
        }
        return true;
      }

      throw new Error("Invalid budget format. Use either '500$' or '100 - 500$'.");
    }),

  body("projectLinks")
    .optional()
    .custom((value) => {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        if (parsed && !Array.isArray(parsed)) {
          throw new Error("'projectLinks' must be an array.");
        }
        return true;
      } catch (error) {
        throw new Error("Invalid format for 'projectLinks'. It must be a JSON array.");
      }
    }),

  // Handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
