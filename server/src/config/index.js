const config = {
  web: {
    port: process.env.PORT || 3001,
    session_secret: process.env.SESSION_SECRET || 'CHANGE ME',
  },
  cron: {
    // Repeat job once every day at 3:00 (am)
    fetch: { interval: process.env.CRON_FETCH_INTERVAL || '0 3 * * *' },
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
    uri: process.env.REDIS_URI || 'redis://127.0.0.1:6379',
  },
};

module.exports = config;
