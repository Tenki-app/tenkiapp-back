const {
	getTask,
	getAllTasks,
	postTask,
	deleteTask,
	putTask,
	getAllTasksByCategory,
} = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/api/tasks/user/:userId').get(getAllTasks).post(postTask);
taskRouter
	.route('/api/tasks/:taskId/user/:userId')
	.get(getTask)
	.delete(deleteTask)
	.put(putTask);
taskRouter
	.route('/api/tasks/category/:category/user/:userId')
	.get(getAllTasksByCategory);

module.exports = taskRouter;
