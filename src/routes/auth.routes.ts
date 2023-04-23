const { authLogin } = require('../controllers/auth.controller');
const authRouter = require('express').Router();
const passport = require('passport');

authRouter.route('/login').post(passport.authenticate('local', { session: false }), authLogin);

module.exports = authRouter;
