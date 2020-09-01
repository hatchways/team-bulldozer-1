const redis = require('redis');
const session = require('express-session');

const RedisStore = require('connect-redis')(session);
const config = require('../config');

const { createRedisClient } = require('../config/redis');

const redisClient = createRedisClient();
const sessionStore = new RedisStore({ client: redisClient });

module.exports = {
  init: (app) => {
    app.use(
      session({
        store: sessionStore,
        secret: config.web.session_secret,
        key: config.web.session_key,
        resave: true,
        saveUninitialized: false,
      }),
    );
    // Return the express app
    return app;
  },
  sessionStore,
};
