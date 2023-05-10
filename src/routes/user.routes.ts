const { getUsers, getUser, postUser, putUser, deleteUser } = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter.route('/').get(getUsers).post(postUser);
userRouter.route('/:id').put(putUser).delete(deleteUser).get(getUser);

module.exports = userRouter;
