const Validators = require('../validators');
const AuthController = require('../controllers/auth');

module.exports = (app) => {
  app.post('/auth/register', Validators.auth.userSignup, AuthController.SignUp);
  app.post('/auth/login', Validators.auth.userSignin, AuthController.Login);
  app.post('/auth/logout', AuthController.Logout);
  app.get('/auth/me', Validators.auth.isAuthenticated, AuthController.Self);
  app.patch('/auth/me', Validators.auth.updateUserProfile, AuthController.UpdateProfile);
};
