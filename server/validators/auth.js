const { body, checkSchema } = require('express-validator');

const MIN_PASS_LEN = 6;

module.exports.userSignup = [
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
];

module.exports.userSignin = [
  body('username').isEmail().normalizeEmail(),
  body('password').isLength({ min: MIN_PASS_LEN }),
];

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send();
};
