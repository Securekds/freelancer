import { body, validationResult } from 'express-validator';

export const validateProfileUpdate = [
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

  body('phoneNumber')
    .optional() // Only validate if provided
    .isMobilePhone().withMessage('Please provide a valid phone number.'),

  body('country')
    .trim()
    .optional()
    .notEmpty().withMessage('Country cannot be empty.'),

  body('birthMonth')
    .optional()
    .isInt({ min: 1, max: 12 }).withMessage('Birth month must be between 1 and 12.'),

  body('birthDay')
    .optional()
    .isInt({ min: 1, max: 31 }).withMessage('Birth day must be between 1 and 31.'),

  body('birthYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Birth year must be between 1900 and current year.'),

  // Validation results middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
