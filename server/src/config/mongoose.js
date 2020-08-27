/* eslint-disable global-require */
const mongoose = require('mongoose');

const config = require('./index').mongo;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

let { uri } = config.uri;

if (process.env.NODE_ENV === 'test') {
  /* eslint-disable import/no-extraneous-dependencies */
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongoServer = new MongoMemoryServer();
  (async () => {
    uri = await mongoServer.getUri();
    mongoose.connect(uri, options);
  })();
} else {
  mongoose.connect(uri, options);
}

module.exports = mongoose;
