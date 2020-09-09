const Queue = require('bull');

const { User, Result } = require('../models');

const searchQueue = require('../queues/search');
const emailQueue = require('../queues/email');

const searchProcessor = require('./processors/search');
const emailProcessor = require('./processors/email');
const config = require('../config');

const hydrate = require('../emails');

/**
 * Add search term to processing queue
 * @param {string} search Search term to add
 * @param {number} [priority=9] 1 is top priority
 */
function addToSearchQueue(search, priority = 9) {
  try {
    searchQueue.add({ search }, { priority });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 * Add email to outgoing queue
 * @param {string} to Email To field
 * @param {string} html Email html body
 * @param {number} priority Queue priority (1 = top)
 */
function addToEmailQueue(to, html, priority = 99) {
  try {
    emailQueue.add({ to, html }, { priority });
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
  searchQueue.on('completed', searchProcessor.saveSearchResult);
  searchQueue.process(searchProcessor.processSearchJob);
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

  fetchJobQueue.add(undefined, { repeat: { cron: config.cron.fetch.interval } });
}

/**
 * Init email queue
 */
function startEmailQueueProcessing() {
  // Start queue processor
  emailQueue.process(emailProcessor.processJob);
}

/**
 * Add all user email to email queue
 */
function startWeeklyCron() {
  const weeklyQueue = new Queue('start-weekly', config.redis.uri);

  weeklyQueue.process(async (job) => {
    // 1. Fetch users
    const users = await User.find({});
    // 2. Loop users
    await users.forEach(async (user) => {
      // 2.1 Fetch mentions for terms
      const { username, terms, crawlers } = user;

      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);

      const result = await Result.latest(lastWeek, today, terms, crawlers);
      if (result.length === 0) {
        // No email for this user today 😢
        return;
      }

      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
      const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat
        .formatToParts(today);

      const [, , { value: lday }] = dateTimeFormat.formatToParts(lastWeek);

      // 2.2 Generate email with template
      const html = hydrate({
        file: 'weekly',
        data: {
          date: `${month} ${lday}-${day}`,
          mentions: JSON.parse(JSON.stringify(result)),
          // TODO: Retrieve host properly
          url: `http://localhost:${config.web.port}`,
        },
      });
      // 2.3 Add to email queue
      addToEmailQueue(username, html);
    });
  });

  weeklyQueue.add(undefined, { repeat: { cron: config.cron.mail.interval } });
}

module.exports = {
  startEmailQueueWorker: startEmailQueueProcessing,
  startSearchQueueWorker: startSearchQueueProcessing,
  addToSearchQueue,
  startDailyCron,
  startWeeklyCron,
};
