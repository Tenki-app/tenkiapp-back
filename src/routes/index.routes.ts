const userRoutes = require('./user.routes');
const taskRoutes = require('./task.routes');

function routerApi(app: any) {
	app.use(userRoutes);
	app.use(taskRoutes);
}

module.exports = routerApi;
export {};
