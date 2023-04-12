const { postTask, deleteTask, getTasks } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:userId/:taskId').delete(deleteTask);
taskRouter.route('/:id').get(getTasks).post(postTask);

module.exports = taskRouter;
