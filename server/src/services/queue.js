const Queue = require('bull');

const { User } = require('../models');
const searchProcessor = require('./processors/search');
const config = require('../config');

/**
 * Add search term to processing queue
 * @param {string} search Search term to add
 * @param {number} [priority=9] 1 is top priority
 */
function addToSearchQueue(search, priority = 9) {
  try {
    const searchQueue = new Queue('search', config.redis.uri);
    searchQueue.add({ search }, { priority });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 * Init search queue
 */
function startSearchQueueProcessing() {
  // Start queue processor
  const searchQueue = new Queue('search', config.redis.uri);
  searchQueue.process(searchProcessor.processSearchJob);
  // (could also have been done through another queue)
  searchQueue.on('completed', searchProcessor.saveSearchResult);
}

/**
 * Add all search terms to the search queue
 */
function startDailyCron() {
  const fetchJobQueue = new Queue('fetcher', config.redis.uri);

  fetchJobQueue.process((job) => {
    // Add all terms to the search queue
    const terms = User.getAllTerms();
    // Add them to queue for processing
    terms.map(addToSearchQueue);
  });

  // Repeat payment job once every day at 3:15 (am)
  fetchJobQueue.add(undefined, { repeat: { cron: config.cron.fetch.interval } });
}

module.exports = {
  startProcessing: startSearchQueueProcessing,
  addToSearchQueue,
  startDailyCron,
};
