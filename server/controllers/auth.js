const passport = require('passport');

const User = require('../models/user');

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
      }).lean();
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

  // Create document
  const user = new User({
    username, companyName, password, email: username, terms: [companyName],
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
  const obj = { terms, email, crawlers };
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);

  await User.updateOne({ _id: req.user._id }, obj).exec();

  return res.status(202).send();
};
