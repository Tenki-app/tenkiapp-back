const { authLogin, authSignup } = require('../controllers/auth.controller');
const { handleRefreshToken } = require('../controllers/token.controller');
const authRouter = require('express').Router();
const passportAuth = require('passport');

authRouter.route('/login').post(passportAuth.authenticate('local', { session: false }), authLogin);
authRouter.route('/signup').post(authSignup);
authRouter.route('/refresh').get(handleRefreshToken);

module.exports = authRouter;
