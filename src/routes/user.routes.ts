const {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser,
	postSignInUser,
} = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter.route('/api/users').get(getUsers).post(postUser);
userRouter.route('/api/users/:id').put(putUser).delete(deleteUser).get(getUser);
userRouter.route('/api/sign_in').post(postSignInUser);

module.exports = userRouter;
