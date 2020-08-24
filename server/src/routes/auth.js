const Validators = require('../validators');
const AuthService = require('../services/auth');

module.exports = (app) => {
  app.post('/auth/register', Validators.auth.userSignup, AuthService.SignUp);
  app.post('/auth/login', Validators.auth.userSignin, AuthService.Login);
  app.post('/auth/logout', AuthService.Logout);
  app.get('/auth/me', Validators.auth.isAuthenticated, AuthService.Self);
  app.patch('/auth/me', Validators.auth.updateUserProfile, AuthService.UpdateProfile);
};
