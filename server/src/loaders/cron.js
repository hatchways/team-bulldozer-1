const {
  startProcessing,
  startDailyCron,
} = require('../services/queue');

// Start search queue processing
startProcessing();

// Start cron job
startDailyCron();

// TODO: Add weekly email job
// addToSearchQueue('ABC Company');
