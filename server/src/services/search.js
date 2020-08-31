const { Result } = require('../models/result');

exports.search = async (req, res, next) => {
  const result = await Result.search(
    req.query.term,
    req.user.crawlers,
    req.query.type || 'popular',
  );
  res.status(200).send(result);
};
