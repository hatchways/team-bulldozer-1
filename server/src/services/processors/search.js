import '../typedef';

const { analyze } = require('../emotion');
const { Result } = require('../../models');

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
    // console.error(error);
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
  const updates = result.map(async (record) => {
    await Result.findOneAndUpdate({
      // Considered as our document unique key
      source: record.source,
      type: record.type,
      url: record.url,
    }, record, {
      new: true,
      upsert: true,
    });
  });

  return Promise.all(updates);
}

module.exports = {
  processSearchJob,
  saveSearchResult,
};
