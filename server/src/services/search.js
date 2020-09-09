const { Result } = require('../models/result');
const { addToSearchQueue } = require('./queue');

exports.search = async (req, res, next) => {
  const result = await Result.search(
    req.query.term,
    req.user.crawlers,
    req.query.type || 'popular',
  );

  if (req.query.term && req.query.term.length > 0) {
    addToSearchQueue(req.query.term, 10);
  }

  res.status(200).send(result);
};
