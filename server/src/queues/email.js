const Queue = require('bull');
const config = require('../config');

/**
 * Outgoing email queue
 */
module.exports = new Queue('email', config.redis.uri);
