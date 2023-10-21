const {
	USERS_ENDPOINTS,
	TASKS_ENDPOINTS,
	AUTH_ENDPOINTS,
} = require('../utils/endpoint.constants.ts');
const userRoutes = require('./user.routes');
const taskRoutes = require('./task.routes');
const authRoutes = require('./auth.routes');

function routerApi(app: any) {
	app.use(AUTH_ENDPOINTS.AUTH_BASE_ROUTE, authRoutes);

	app.use(USERS_ENDPOINTS.USER_BASE_ROUTE, userRoutes);
	app.use(TASKS_ENDPOINTS.TASK_BASE_ROUTE, taskRoutes);
}

module.exports = routerApi;
export {};
