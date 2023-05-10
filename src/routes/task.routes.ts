const { getTask, getTasks, postTask, deleteTask, putTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:userId').get(getTasks).post(postTask);
taskRouter.route('/:userId/:taskId').get(getTask).delete(deleteTask).put(putTask);

module.exports = taskRouter;
