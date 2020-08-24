/* eslint-disable global-require */
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

if (process.env.NODE_ENV === 'test') {
  /* eslint-disable import/no-extraneous-dependencies */
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongoServer = new MongoMemoryServer();
  mongoServer.getUri().then((mongoUri) => {
    mongoose
      .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });
} else {
  mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });
}
