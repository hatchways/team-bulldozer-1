const passport = require('passport');
const { validationResult } = require('express-validator');

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
      });
      return res.status(statusCode).send(dbUser);
    });

    return true;
  })(req, res, next);
}

exports.SignUp = async function test(req, res, next) {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    return res.status(400).send({ errors: errors.errors });
  }
  const { username } = req.body;
  const userExists = await User.exists({ username });
  if (userExists) {
    return res.status(400).send({ response: `Email ${username} already used!` });
  }

  const { password, companyName } = req.body;

  // Create document
  const user = new User({ username, companyName, password });
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
