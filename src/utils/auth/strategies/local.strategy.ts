const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
import { getUserName } from '../../../controllers/auth.controller';

const LocalStrategy = new Strategy(async (username: string, password: string, done: any) => {
	let resp = {};
	try {
		const user = await getUserName(username);
		if (!user || !user.password) {
			resp = { code: 401, name: 'No autorizado', message: 'Contraseña no valida' };
			return done('Usuario no existe', false);
		}
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			done('Contraseña no coincide', false);
		}
		done(null, user);
	} catch (err: any) {
		done(err, false);
	}
});

module.exports = LocalStrategy;
