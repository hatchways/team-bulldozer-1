const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const { join } = require('path');

const { json, urlencoded } = express;

module.exports = async (app) => {
  app.use(logger('dev'));
  app.use(json());
  app.use(cors());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());

  // Return the express app
  return app;
};
