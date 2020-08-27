const Queue = require('bull');

const searchProcessor = require('./processors/search');
const config = require('../config').redis;

const searchQueue = new Queue('search', { redis: config });

/**
 * Init search queue
 */
function startSearchQueueProcessing() {
  // Start queue processor
  searchQueue.process(searchProcessor.processSearchJob);
  // (could also have been done through another queue)
  searchQueue.on('completed', searchProcessor.saveSearchResult);
}

/**
 * Add search term to processing queue
 * @param {string} search Search term to add
 * @param {number} [priority=9] 1 is top priority
 */
function addToSearchQueue(search, priority = 9) {
  searchQueue.add({ search }, { priority });
}

module.exports = {
  queue: searchQueue,
  startProcessing: startSearchQueueProcessing,
  addToSearchQueue,
};
