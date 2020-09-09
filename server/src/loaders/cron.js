const {
  startEmailQueueWorker,
  startSearchQueueWorker,
  startDailyCron,
  startWeeklyCron,
} = require('../services/queue');

// Start search queue processing
startSearchQueueWorker();
startEmailQueueWorker();

// Start cron job
startDailyCron();
startWeeklyCron();

// TODO: Add weekly email job
// addToSearchQueue('ABC Company');
