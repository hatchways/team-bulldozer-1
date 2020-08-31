const { query, validationResult } = require('express-validator');

const SearchSchema = {
  term: query('term')
    .isLength({ min: 3 }).optional({ nullable: true, checkFalsy: true }),

  type: query('type')
    .isIn(['popular', 'recent']).optional(),
};

// TODO: Put in reusable service
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

exports.search = validate([
  SearchSchema.term,
  SearchSchema.type,
]);

// TODO: Put in reusable service
// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return res.status(401).send();
// };
// exports.isAuthenticated = isAuthenticated;

// TODO: Uncomment once properly tested
// exports.search = [
//   isAuthenticated,
//   validate([
//     SearchSchema.term,
//     SearchSchema.type,
//   ]),
// ];
