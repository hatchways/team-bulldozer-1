const mongoose = require('../config/mongoose');

const { Schema } = mongoose;

const Result = new Schema({
  // Crawler Name
  source: {
    type: String,
    required: true,
    index: { unique: false },
  },
  type: {
    type: String,
    required: true,
    index: { unique: false },
  },
  title: {
    type: String,
    required: true,
    index: { unique: false },
  },
  body: {
    type: String,
    required: true,
    index: { unique: false },
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

/**
 * Find recent mentions
 * @param {string} term Search term
 * @param {Array} types Crawlers to use
 */
Result.statics.search = async function search(term, crawlers, type) {
  return this.find({
    $or: [
      { title: { $regex: term, $options: 'i' } },
      { body: { $regex: term, $options: 'i' } },
    ],
    source: { $in: crawlers },
    type,
  }).sort({ 'meta.sentiment': -1 });
};

const Model = mongoose.model('Result', Result);

module.exports = {
  Result: Model,
  ResultModel: (conn) => conn.model('Result', Result),
};