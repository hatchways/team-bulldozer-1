const express = require('express');

const app = express();

// Load app modules
require('./loaders')(app);

// Load app routes
require('./routes')(app);

// Load error handling last
require('./loaders/error')(app);

module.exports = app;
