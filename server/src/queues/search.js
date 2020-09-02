const Queue = require('bull');
const config = require('../config');

module.exports = new Queue('search', config.redis.uri);
