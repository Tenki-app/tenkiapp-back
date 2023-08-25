const { model } = require('mongoose');
const taskSchema = require('./task.model');
let mongoose = require('mongoose');
import { IUserCreate } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		user_name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
		tasks: [taskSchema],
	},
	{
		toJSON: {
			transform: (doc: IUserCreate, res: IUserCreate) => {
				delete res.password;
				delete res.refreshToken;
			},
		},
	}
);

module.exports = model('users', userSchema);

export {};
