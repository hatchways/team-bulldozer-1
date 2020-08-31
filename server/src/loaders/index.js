/* eslint-disable global-require */

/**
 * All loaders are here to import all of them just with one command
 * in the main app.js
 */
module.exports = (app) => {
  // Load express modules
  require('./express')(app);
  // Load express session module
  require('./session').init(app);
  // Init passport
  require('./passport')(app);
};
