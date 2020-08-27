const { CronJob } = require('cron');
const config = require('../config').cron;

const { searchQueue, startProcessing, addToSearchQueue } = require('../services/queue');

// Start search queue processing
startProcessing();

module.exports = async (app) => {
  const queueSearchjob = new CronJob(config.fetch.interval, () => {
    // TODO: add search queries to queue
    // searchQueue.add({});
  }, null, true, 'America/Los_Angeles');
  queueSearchjob.start();
};
