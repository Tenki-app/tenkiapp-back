const { postTasks } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:id').post(postTasks);

module.exports = taskRouter;
