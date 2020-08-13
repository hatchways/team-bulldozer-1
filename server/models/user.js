const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// TODO: Put in shared config file
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

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
}, { timestamps: true });

User.plugin(passportLocalMongoose);

const Model = mongoose.model('User', User);
module.exports = Model;
