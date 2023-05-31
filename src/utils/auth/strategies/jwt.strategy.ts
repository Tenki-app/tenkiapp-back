require('dotenv').config();

const { Strategy, ExtractJwt } = require('passport-jwt');
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: accessTokenKey,
};

const JWTStrategy = new Strategy(options, (payload: any, done: any) => {
	return done(null, payload);
});

module.exports = JWTStrategy;
