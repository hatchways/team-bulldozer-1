/* eslint-disable global-require */
const mongoose = require('mongoose');

const config = require('./index').mongo;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 1000,
};

mongoose.connect(config.uri, options);

module.exports = mongoose;
