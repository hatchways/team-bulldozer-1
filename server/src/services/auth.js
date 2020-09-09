const passport = require('passport');

const { User } = require('../models/user');
const { addToSearchQueue } = require('./queue');

// TODO: Put in settings somewhere
const defaultCrawlers = ['reddit', 'twitter'];

function Authenticate(req, res, next, statusCode) {
  passport.authenticate('local', (err, user) => {
    if (err) { next(err); }
    if (!user) {
      return res.status(400).send();
    }
    req.logIn(user, async (loginErr) => {
      if (loginErr) { return next(loginErr); }
      const dbUser = await User.findOne({ _id: user._id }, {
        hash: false,
        salt: false,
        __v: false,
      }).lean();

      addToSearchQueue(dbUser.companyName, 10);

      return res.status(statusCode).send(dbUser);
    });

    return true;
  })(req, res, next);
}

exports.SignUp = async (req, res, next) => {
  const { username } = req.body;
  const userExists = await User.exists({ username });
  if (userExists) {
    return res.status(400).send({ response: `Email ${username} already used!` });
  }

  const { password, companyName } = req.body;

  // Add company name to queue (ideally should have been done through emitter pattern)
  addToSearchQueue(companyName, 1);

  // Create document
  const user = new User({
    username,
    password,
    companyName,
    email: username,
    terms: [companyName],
    crawlers: defaultCrawlers,
  });
  await user.setPassword(password);
  await user.save();

  return Authenticate(req, res, next, 201);
};

exports.Login = async (req, res, next) => {
  Authenticate(req, res, next, 200);
};

exports.Logout = async (req, res) => {
  req.logout();
  return res.status(200).send();
};

exports.Self = async (req, res) => {
  res.status(200).send(req.user);
};

exports.UpdateProfile = async (req, res) => {
  const { terms, email, crawlers } = req.body;
  const obj = {
    email,
    terms: terms && [...new Set(terms)],
    crawlers: crawlers && [...new Set(crawlers)],
  };

  let status = 200;

  // TODO: add to utility class (remove undefined keys)
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);

  if (Object.keys(obj).length > 0) {
    // Quickly add terms to queue
    if (obj.terms !== undefined && obj.terms.length > 0) {
      // Add search terms to queue to refresh local data
      obj.terms.map((term) => addToSearchQueue(term, 1));
    }
    // Update user profile
    await User.updateOne({ _id: req.user._id }, obj).exec();
    status = 202;
  }

  const updatedUser = await User.findOne({ _id: req.user._id }).lean();
  return res.status(status).send(updatedUser);
};
