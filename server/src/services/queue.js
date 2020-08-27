const Queue = require('bull');

const { User } = require('../models');
const searchProcessor = require('./processors/search');
const config = require('../config').redis;
const cronConfig = require('../config').cron;

const searchQueue = new Queue('search', { redis: config });
const fetchJobQueue = new Queue('fetcher', { redis: config });

/**
 * Add search term to processing queue
 * @param {string} search Search term to add
 * @param {number} [priority=9] 1 is top priority
 */
function addToSearchQueue(search, priority = 9) {
  searchQueue.add({ search }, { priority });
}

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
 * Add all search terms to the search queue
 */
function startDailyCron() {
  fetchJobQueue.process((job) => {
    // Add all terms to the search queue
    const terms = User.getAllTerms();
    // Add them to queue for processing
    terms.map(addToSearchQueue);
  });

  // Repeat payment job once every day at 3:15 (am)
  fetchJobQueue.add(undefined, { repeat: { cron: cronConfig.fetch.interval } });
}

module.exports = {
  queue: searchQueue,
  startProcessing: startSearchQueueProcessing,
  addToSearchQueue,
  startDailyCron,
};
