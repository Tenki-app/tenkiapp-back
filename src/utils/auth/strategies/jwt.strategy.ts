require('dotenv').config();

const { Strategy, ExtractJwt } = require('passport-jwt');
const jwtKey = process.env.JWT_KEY;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtKey,
};

const JWTStrategy = new Strategy(options, (payload: any, done: any) => {
	return done(null, payload);
});

module.exports = JWTStrategy;
