const passport = require('passport');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.SignUp = async (req, res) => {
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

  await User.authenticate()(username, password);

  // TODO: Manually return token still required when using passport?
  return res.status(201).send({ response: `${username} account created!` });
};

exports.Login = async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { next(err); }
    if (!user) {
      return res.status(400).send();
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) { return next(loginErr); }
      // TODO: Manually return token still required when using passport?
      return res.status(200).send();
    });

    return true;
  })(req, res, next);
};

exports.Self = async (req, res) => {
  if (!req.user) {
    return res.status(401).send();
  }
  return res.status(200).send(req.user);
};
