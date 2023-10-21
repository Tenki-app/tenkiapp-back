const {
	authLogin,
	authSignup,
	handleLogout,
} = require('../controllers/auth.controller');
const authRouter = require('express').Router();

authRouter.route('/login').post(authLogin);
authRouter.route('/signup').post(authSignup);
authRouter.route('/logout').get(handleLogout);

module.exports = authRouter;
