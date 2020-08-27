const { analyze } = require('../emotion');
const { Result } = require('../../models');

const { CrawlerLoaderService } = require('../crawler');

/**
 * @typedef {Object} CrawlerResult
 * @property {string} source
 * @property {string} type
 * @property {string} title
 * @property {string} body
 * @property {string} url
 * @property {string} thumbnail
 */

/**
 * @typedef {Object} CrawlerResults
 * @property {string} search
 * @property {CrawlerResult[]} popular
 * @property {CrawlerResult[]} recent
 */

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
 * Return {@link CrawlerResults} objects
 * @param {string} search Search term
 */
async function getCrawlerResults(search) {
  const crawlerService = new CrawlerLoaderService();
  const activeCrawlers = crawlerService.getCrawlers();

  const jobs = activeCrawlers.map(async (crawlerName) => {
    // Retrieve crawler instance
    const crawler = crawlerService.getCrawler(crawlerName);
    // Call both search types
    const popular = await crawler.findPopular(search);
    const recent = await crawler.findRecent(search);
    // Push to result array
    return {
      search,
      popular,
      recent,
    };
  });
  return Promise.all(jobs);
}

/**
 * Search queue processor
 * @param {*} job Bull JS job
 * @param {*} done Done callback
 */
async function processSearchJob(job, done) {
  const results = [];
  try {
    const crawlerResults = await getCrawlerResults(job.data.search);

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
    throw new Error(error);
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
