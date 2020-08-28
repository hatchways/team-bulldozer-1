const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('../config/mongoose');

const { Schema } = mongoose;

const User = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  companyName: {
    type: String,
    required: true,
    index: { unique: false },
  },
  terms: {
    type: [String],
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  crawlers: {
    type: [String],
    required: false,
  },
}, { timestamps: true });

User.plugin(passportLocalMongoose);

/**
 * Find all distinct terms
 * @param {string} term Search term
 * @param {Array} types Crawlers to use
 */
User.statics.getAllTerms = async function getAllTerms() {
  return this.distinct('terms');
};

const Model = mongoose.model('User', User);
module.exports = {
  User: Model,
  UserModel: (conn) => conn.model('User', User),
};
