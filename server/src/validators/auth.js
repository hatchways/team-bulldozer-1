const { body, validationResult } = require('express-validator');

const MIN_PASS_LEN = 6;
const MIN_COMPANY_NAME_LEN = 3;

const UserSchema = {
  username: body('username')
    .isEmail().normalizeEmail(),

  password: body('password')
    .isLength({ min: MIN_PASS_LEN }),

  companyName: body('companyName')
    .isString().trim()
    .isLength({ min: MIN_COMPANY_NAME_LEN }),

  email: body('email')
    .isEmail().normalizeEmail(),

  terms: body('terms')
    .isArray(),

  crawlers: body('crawlers')
    .isArray(),
};

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send();
};

exports.isAuthenticated = isAuthenticated;

exports.userSignup = validate([
  UserSchema.username,
  UserSchema.password,
  UserSchema.companyName,
]);

exports.userSignin = validate([
  UserSchema.username,
  UserSchema.password,
]);

exports.updateUserProfile = [
  isAuthenticated,
  validate([
    UserSchema.companyName.optional(),
    UserSchema.email.optional(),
    UserSchema.terms.optional(),
    UserSchema.crawlers.optional(),
  ]),
];
