import { body, validationResult } from 'express-validator';

export const validateRegisterInputs = [
  body('firstName')
    .trim()
    .escape()
    .customSanitizer(value => value.replace(/<[^>]*>?/gm, '')) // Remove HTML tags
    .notEmpty().withMessage('First name is required.')
    .matches(/^[A-Za-z\s]+$/).withMessage('First name can only contain letters and spaces.'),

  body('lastName')
    .trim()
    .escape()
    .customSanitizer(value => value.replace(/<[^>]*>?/gm, '')) // Remove HTML tags
    .notEmpty().withMessage('Last name is required.')
    .matches(/^[A-Za-z\s]+$/).withMessage('Last name can only contain letters and spaces.'),

  body('email')
    .trim()
    .escape()
    .isEmail().withMessage('Please provide a valid email address.'),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage('Password must contain at least one letter, one number, and one special character.'),

  body('isBuyerSelected')
    .isBoolean().withMessage('isBuyerSelected must be a boolean.'),

  body('selectedOptions')
    .isArray().withMessage('Selected options must be an array.')
    .custom((value) => value && value.length >= 1)
    .withMessage('At least one option must be selected.'),

  // Validation results middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
