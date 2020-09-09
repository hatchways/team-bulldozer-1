require('../typedef');

const { analyze } = require('../emotion');
const { Result } = require('../../models');

const { createRedisClient } = require('../../config/redis');

const { CrawlerEngine } = require('../crawler');

/**
 * Fetch sentiment for records. Update them and then return updated array
 * @param {...CrawlerResult} records Array of {@link CrawlerResult} objects
 */
async function fetchSentiment(records) {
  return Promise.all(records.map(async (record) => {
    const newRecord = record;
    newRecord.meta = await analyze(record.body);
    return newRecord;
  }));
}

/**
 * Search queue processor
 * @param {*} job Bull JS job
 * @param {*} done Done callback
 */
async function processSearchJob(job, done) {
  if (job.data.search === '') {
    done(null, []);
    return;
  }
  const results = [];
  try {
    const crawlerResults = await CrawlerEngine.search(job.data.search);

    let records = crawlerResults
      // Get recent
      .flatMap((r) => r.recent)
      // Get populars
      .concat(crawlerResults.flatMap((r) => r.popular))
      // Filter junk
      .filter((o) => typeof o === 'object');

    // Lets add sentiment analysis (could also have been done through another queue)
    records = await fetchSentiment(records);

    done(null, records);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 * Persist search results to DB
 * @param {*} job Job that just terminated
 * @param {...CrawlerResult} result Converted results
 */
async function saveSearchResult(job, result) {
  // Job completed! Time to save
  if (result === undefined || result.length === 0) {
    return Promise.resolve([]);
  }

  // Upsert records
  await result.map(async (record) => {
    const key = {
      // Considered as our document unique key
      source: record.source,
      type: record.type,
      url: record.url,
    };
    await Result.findOneAndUpdate(key, record, {
      new: true,
      upsert: true,
    });

    // Publish event to redis so each server instance can broadcast to their users
    const res = await Result.findOne(key);
    const client = createRedisClient();
    await client.publish('found', JSON.stringify(res));
    client.quit();
  });

  return true;
}

module.exports = {
  processSearchJob,
  saveSearchResult,
};
