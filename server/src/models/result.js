/* eslint-disable no-param-reassign */
const mongoose = require('../config/mongoose');

const { Schema } = mongoose;

function truncateBody(str) {
  const len = 500;
  if (str.length <= len) {
    return str;
  }
  return `${str.slice(0, len)}...`;
}

const Result = new Schema({
  // Crawler Name
  source: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: false,
    trim: true,
  },
  date: {
    type: Date,
    required: false,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  meta: {
    sentiment: {
      type: Number,
      required: true,
    },
    emotion: {
      type: String,
      required: true,
      enum: ['good', 'bad', 'neutral'],
      default: 'neutral',
    },
  },
}, { timestamps: true });

Result.index({ source: 1, type: 1, url: 1 }, { unique: true });
Result.index({
  source: 1, type: 1, title: 'text', body: 'text',
});

/**
 * Find recent mentions
 * @param {string} term Search term
 * @param {Array} crawlers Crawlers to use
 * @param {string} Type Result type
 */
Result.statics.search = async function search(term = '', crawlers, type) {
  const sort = type === 'recent'
    ? { date: -1 }
    : { 'meta.sentiment': -1 };

  return this.find({
    $or: [
      { title: { $regex: term, $options: 'i' } },
      { body: { $regex: term, $options: 'i' } },
    ],
    source: { $in: crawlers },
    type,
  }, {}, { limit: 100 }).sort(sort);
};

/**
 * Find recent mentions
 * @param {Date} from Date from
 * @param {Date} to Date to
 * @param {string} terms Search terms
 * @param {Array} crawlers Crawlers to use
 */
Result.statics.latest = async function latest(from, to, terms, crawlers) {
  const termsParams = terms.map((term) => [
    { title: { $regex: term, $options: 'i' } },
    { body: { $regex: term, $options: 'i' } },
  ]).flat();
  return this.find({
    $or: termsParams,
    source: { $in: crawlers },
    type: 'recent',
    date: { $gte: from, $lt: to },
  }, {}, { limit: 5 })
    .sort({ date: -1 });
};

/**
 * Plugin to trim body text on read
 */
function trimBodyPlugin(schema, options) {
  schema.post(['find', 'findOne'], (docs) => {
    if (docs === undefined || docs === null) { return; }

    if (Array.isArray(docs)) {
      docs = docs.map((doc) => {
        doc.body = truncateBody(doc.body);
        return doc;
      });
    } else {
      docs.body = truncateBody(docs.body);
    }
  });
}

// Register our plugin
Result.plugin(trimBodyPlugin);

const Model = mongoose.model('Result', Result);

module.exports = {
  Result: Model,
  ResultModel: (conn) => conn.model('Result', Result),
};
