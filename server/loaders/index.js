/* eslint-disable global-require */
/**
 * All loaders are here to import all of them just with one command
 * in the main app.js
 */
module.exports = (app) => {
  require('./express')(app);
  require('./passport')(app);
};
