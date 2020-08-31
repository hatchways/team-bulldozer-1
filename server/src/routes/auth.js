const router = require('express').Router();

const Validators = require('../validators');
const AuthService = require('../services/auth');

router.post('/register', Validators.auth.userSignup, AuthService.SignUp);
router.post('/login', Validators.auth.userSignin, AuthService.Login);
router.post('/logout', AuthService.Logout);
router.get('/me', Validators.auth.isAuthenticated, AuthService.Self);
router.patch('/me', Validators.auth.updateUserProfile, AuthService.UpdateProfile);

module.exports = router;
