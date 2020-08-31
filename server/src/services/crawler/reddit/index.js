require('../../typedef');

const Reddit = require('reddit');
const config = require('../../../config');

const reddit = new Reddit(config.reddit);

const redditThumbnailStates = {
  self: 'https://www.reddit.com/static/self_default2.png',
  default: 'https://www.reddit.com/static/noimage.png',
  nsfw: 'https://www.reddit.com/static/nsfw2.png',
};

function convert(type, obj) {
  return {
    source: 'reddit',
    type,
    title: obj.data.title,
    author: obj.data.author,
    body: obj.data.selftext,
    url: `https://reddit.com${obj.data.permalink}`,
    thumbnail: redditThumbnailStates[obj.data.thumbnail] !== undefined
      ? redditThumbnailStates[obj.data.thumbnail]
      : obj.data.thumbnail,
    date: new Date(obj.data.created_utc * 1000),
  };
}

async function search(term, type) {
  // DOC here: https://www.reddit.com/dev/api/#GET_search
  const query = {
    q: term,
    limit: 50,
    sort: type,
  };
  const posts = await reddit.get('/search', query);
  return posts.data.children.map((result) => convert(query.result_type, result));
}

/**
 * @type Plugin
 */
module.exports = {
  name: 'reddit',
  findPopular: (term) => search(term, 'hot'),
  findRecent: (term) => search(term, 'new'),
};
