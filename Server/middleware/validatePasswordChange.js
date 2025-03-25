import { body, validationResult } from "express-validator";

export const validatePasswordChange = [
  // Validate and sanitize current password
  body("currentPassword")
    .isLength({ min: 8 }).withMessage("Current password must be at least 8 characters long.")
    .trim().escape().customSanitizer(value => value.replace(/<[^>]*>?/gm, '')),

  // Validate and sanitize new password
  body("newPassword")
    .isLength({ min: 8 }).withMessage("New password must be at least 8 characters long.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage("New password must include at least one special character.")
    .matches(/\d/).withMessage("New password must include at least one number.")
    .trim().escape().customSanitizer(value => value.replace(/<[^>]*>?/gm, '')),

  // Validate confirm password and sanitize
  body("confirmNewPassword")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Passwords do not match.")
    .trim().escape().customSanitizer(value => value.replace(/<[^>]*>?/gm, '')),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
