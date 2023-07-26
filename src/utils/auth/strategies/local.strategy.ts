const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
import { getUserName } from '../../../controllers/auth.controller';

const LocalStrategy = new Strategy(async (username: string, password: string, done: any) => {
	let resp = {};
	try {
		const user = await getUserName(username);
		if (!user || !user.password) {
			// pending to add custom message to response
			resp = {
				code: 401,
				name: 'Unauthorized',
				message: 'Incorrect password or username',
			};
			const err = new Error();
			return done(null, resp);
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			// pending to add custom message to response
			resp = { code: 401, name: 'Unauthorized', message: 'Password does not match' };
			return done(null, resp);
		}
		return done(null, user);
	} catch (err: any) {
		done(err, false);
	}
});

module.exports = LocalStrategy;
