/* eslint-disable global-require */
const mongoose = require('mongoose');

const config = require('./index');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 1000,
};

mongoose.connect(config.mongo.uri, options);

module.exports = mongoose;
