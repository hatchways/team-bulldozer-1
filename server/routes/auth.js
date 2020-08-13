const Validators = require('../validators/index');
const AuthController = require('../controllers/auth');

module.exports = (app) => {
  app.post('/auth/register', Validators.auth.userSignup, AuthController.SignUp);
  app.post('/auth/login', Validators.auth.userSignin, AuthController.Login);
  app.post('/auth/logout', AuthController.Logout);
  app.get('/auth/me', AuthController.Self);
};
