const { getTasks, postTask } = require('../controllers/task.controller');
const taskRouter = require('express').Router();

taskRouter.route('/:id').get(getTasks).post(postTask);

module.exports = taskRouter;
