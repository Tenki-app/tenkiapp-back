const userRoutes = require('./user.routes');
const { USERS_ENDPOINTS } = require('../utils/endpoint.constants.ts');

function routerApi(app: any) {
	app.use(USERS_ENDPOINTS.GET_ALL_USERS, userRoutes);
}

module.exports = routerApi;
