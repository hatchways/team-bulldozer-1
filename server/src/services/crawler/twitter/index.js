const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

const twitterCrawler = {};
twitterCrawler.name = 'twitter';
twitterCrawler.findPopular = async (term) => {
  // TODO : Sanitize input
  const tweets = await T.get('search/tweets', {
    q: term,
    count: 10,
    result_type: 'popular',
  });

  return tweets.data.statuses;
};
twitterCrawler.findRecent = async (term) => {
  // TODO : Sanitize input
  const tweets = await T.get('search/tweets', {
    q: term,
    count: 10,
    result_type: 'recent',
  });

  return tweets.data.statuses;
};

module.exports = { crawler: twitterCrawler };

/**
 * Ensure all parameters are properly URL encoded.
 * https://api.twitter.com/1.1/search/tweets.json?q=${search}&result_type=recent
 * https://api.twitter.com/1.1/search/tweets.json?q=${search}&result_type=popular
 */
