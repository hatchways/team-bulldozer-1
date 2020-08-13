const passport = require('passport');
const { User } = require('../models');

module.exports = async (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Return the express app
  return app;
};
