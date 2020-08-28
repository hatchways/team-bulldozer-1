/* eslint-disable global-require */
/**
 * All routes are here to import all of them just with one command
 * in the main app.js
 */
module.exports = (app) => {
  require('./home')(app);
  require('./auth')(app);
  require('./search')(app);
};
