const Twitter = require('twitter');
const config = require('../../../config');

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.token,
  access_token_secret: config.twitter.token_secret,
});

const crawler = {};
crawler.name = 'twitter';

async function searchTweets(term, type) {
  const query = {
    q: escape(term),
    count: 50,
    result_type: escape(type),
  };
  const tweets = await client.get('search/tweets', query);
  return tweets.statuses.map((result) => crawler.convert(query.result_type, result));
}

crawler.convert = (type, obj) => ({
  // TODO: Fetch full length body if (obj.truncated === true)
  source: crawler.name,
  type,
  title: obj.text,
  body: obj.text,
  url: `https://twitter.com/i/web/status/${obj.id_str}`,
  thumbnail: obj.user.profile_image_url_https,
});

crawler.findPopular = async (term) => searchTweets(term, 'popular');
crawler.findRecent = async (term) => searchTweets(term, 'recent');

module.exports = { crawler };

/**
 * Ensure all parameters are properly URL encoded.
 * https://api.twitter.com/1.1/search/tweets.json?q=${search}&result_type=recent
 * https://api.twitter.com/1.1/search/tweets.json?q=${search}&result_type=popular
 */
