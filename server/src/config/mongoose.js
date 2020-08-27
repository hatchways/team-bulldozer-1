/* eslint-disable global-require */
const mongoose = require("mongoose");

const config = require("./index").mongo;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  connectTimeoutMS: 1000
};

let { uri } = config;

if (process.env.NODE_ENV === "test") {
  /* eslint-disable import/no-extraneous-dependencies */
  //   const { MongoMemoryServer } = require('mongodb-memory-server');
  //   const mongoServer = new MongoMemoryServer();
  //   (async () => {
  //     uri = await mongoServer.getUri();
  //     // eslint-disable-next-line no-console
  //     mongoose.connect(uri, options, (error) => console.error);
  //   })();
  // } else {
  // eslint-disable-next-line no-console
  mongoose.connect(uri, options, error => console.error);
}

module.exports = mongoose;
