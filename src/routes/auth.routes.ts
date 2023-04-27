const { authLogin } = require('../controllers/auth.controller');
const authRouter = require('express').Router();
const passportAuth = require('passport');

authRouter.route('/login').post(passportAuth.authenticate('local', { session: false }), authLogin);

module.exports = authRouter;
