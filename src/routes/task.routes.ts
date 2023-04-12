const { postTasks, deleteTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:id').post(postTasks);
taskRouter.route('/:userId/:taskId').delete(deleteTask);
module.exports = taskRouter;
