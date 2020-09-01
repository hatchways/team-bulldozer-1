const redis = require('redis');
const config = require('./index');

module.exports = {
  redis,
  createRedisClient: () => {
    const client = redis.createClient({
      port: config.redis.port,
      host: config.redis.host,
    });

    client.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

    return client;
  },
};
