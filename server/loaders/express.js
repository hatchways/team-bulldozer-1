const express = require('express');
const logger = require('morgan');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const { json, urlencoded } = express;
const { join } = require('path');

module.exports = async (app) => {
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(join(__dirname, 'public')));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'rQl5OG9XEkK7JX7LEuXKVYH26K55GQ',
    resave: true,
    saveUninitialized: false,
  }));

  // Return the express app
  return app;
};
