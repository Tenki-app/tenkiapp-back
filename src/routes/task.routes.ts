const { getTask, getTasks, postTask, deleteTask, putTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();
const passportTask = require('passport');

taskRouter
	.route('/:userId')
	.get(getTasks)
	.post(passportTask.authenticate('jwt', { session: false }), postTask);
taskRouter.route('/:userId/:taskId').get(getTask).delete(deleteTask).put(putTask);

module.exports = taskRouter;
