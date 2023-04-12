const { getTask, getTasks, postTask, deleteTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:userId').get(getTasks).post(postTask);
taskRouter.route('/:userId/:taskId').get(getTask).delete(deleteTask);

module.exports = taskRouter;
