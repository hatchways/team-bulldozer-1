const config = {
  web: {
    port: process.env.PORT || 3001,
    session_secret: process.env.SESSION_SECRET || '',
  },
  cron: {
    // Repeat job once every day at 3:00 (am)
    fetch: { interval: '0 3 * * *' },
  },
  mongo: {
    uri: process.env.MONGO_DB || 'mongodb://localhost',
  },
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY || 'TWITTER_CONSUMER_KEY',
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'TWITTER_CONSUMER_SECRET',
    token: process.env.TWITTER_TOKEN || 'TWITTER_TOKEN',
    token_secret: process.env.TWITTER_TOKEN_SECRET || 'TWITTER_TOKEN_SECRET',
  },
  redis: {
    host: process.env.REDIS_HOSTNAME || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
};

module.exports = config;
