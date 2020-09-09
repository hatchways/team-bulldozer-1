const redis = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOSTNAME || 'localhost',
};
redis.uri = `redis://${redis.host}:${redis.port}`;

const config = {
  web: {
    port: process.env.PORT || 3001,
    session_secret: process.env.SESSION_SECRET || 'CHANGE ME',
    session_key: 'crawler.sid',
  },
  cron: {
    // Repeat job once every day at 3:00 (am)
    fetch: { interval: process.env.CRON_FETCH_INTERVAL || '0 3 * * *' },
    // At 08:00 every Monday : '0 8 * * 1'
    mail: { interval: process.env.CRON_MAIL_INTERVAL || '* * * * *' },
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
  reddit: {
    appId: process.env.REDDIT_APP_ID || 'REDDIT_APP_ID',
    appSecret: process.env.REDDIT_APP_SECRET || 'REDDIT_APP_SECRET',
    username: process.env.REDDIT_USERNAME || 'REDDIT_USERNAME',
    password: process.env.REDDIT_PASSWORD || 'REDDIT_PASSWORD',
    userAgent: 'Mentions/1.0.0',
  },
  redis,
};

module.exports = config;
