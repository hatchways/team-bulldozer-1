const { body, checkSchema, validationResult } = require('express-validator');

const MIN_PASS_LEN = 6;

async function validateParameters(req, res, next) {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return res.status(400).send({ errors: errors.errors });
  }

  return next();
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send();
}

exports.userSignup = [
  body('username')
    .isEmail()
    .normalizeEmail(),
  checkSchema({
    password: {
      isLength: {
        errorMessage: 'Password should be at least 6 chars long',
        // Multiple options would be expressed as an array
        options: { min: MIN_PASS_LEN },
      },
    },
    companyName: {
      isLength: {
        errorMessage: 'Company name should be at least 3 chars long',
        // Multiple options would be expressed as an array
        options: { min: 3 },
      },
    },
  }),
  validateParameters,
];

exports.userSignin = [
  body('username').isEmail().normalizeEmail(),
  body('password').isLength({ min: MIN_PASS_LEN }),
];

exports.isAuthenticated = isAuthenticated;

exports.updateUserProfile = [
  isAuthenticated,
  body('email').isEmail().normalizeEmail().optional(),
  body('terms').isArray().optional(),
  validateParameters,
];
