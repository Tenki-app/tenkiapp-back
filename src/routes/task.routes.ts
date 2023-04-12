const { getTask, getTasks, postTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:userId').get(getTasks).post(postTask);
taskRouter.route('/:userId/:taskId').get(getTask);

module.exports = taskRouter;
