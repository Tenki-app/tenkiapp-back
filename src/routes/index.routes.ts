const {
	USERS_ENDPOINTS,
	TASKS_ENDPOINTS,
} = require('../utils/endpoint.constants.ts');
const userRoutes = require('./user.routes');
const taskRoutes = require('./task.routes');

function routerApi(app: any) {
	app.use(USERS_ENDPOINTS.USER_BASE_ROUTE, userRoutes);
	app.use(TASKS_ENDPOINTS.TASK_BASE_ROUTE, taskRoutes);
}

module.exports = routerApi;
export {};
