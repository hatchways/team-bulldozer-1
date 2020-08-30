const express = require('express');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const { join } = require('path');

const { json, urlencoded } = express;

module.exports = async (app) => {
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(join(__dirname, 'public')));

  app.use(session({
    secret: config.web.session_secret,
    resave: true,
    saveUninitialized: false,
  }));

  // Return the express app
  return app;
};
