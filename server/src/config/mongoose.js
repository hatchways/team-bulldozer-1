/* eslint-disable global-require */
const mongoose = require('mongoose');

const config = require('./index').mongo;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

if (process.env.NODE_ENV === 'test') {
  /* eslint-disable import/no-extraneous-dependencies */
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongoServer = new MongoMemoryServer();
  mongoServer.getUri().then((mongoUri) => {
    mongoose.connect(mongoUri, options);
  });
} else {
  mongoose.connect(config.uri, options);
}

module.exports = mongoose;
