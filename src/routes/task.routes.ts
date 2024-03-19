const {
	getTask,
	getTasks,
	postTask,
	deleteTask,
	putTask,
} = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/api/tasks/user/:userId').get(getTasks).post(postTask);
taskRouter
	.route('/api/tasks/:taskId/user/:userId')
	.get(getTask)
	.delete(deleteTask)
	.put(putTask);

module.exports = taskRouter;
