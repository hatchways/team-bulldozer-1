const Validators = require('../validators').search;
const { search } = require('../services/search');

module.exports = (app) => {
  app.get('/search', Validators.search, search);
};
