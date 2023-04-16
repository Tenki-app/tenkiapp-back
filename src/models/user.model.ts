const { Schema, model } = require('mongoose');
const taskSchema = require('./task.model');
let mongoose = require('mongoose');
import { IUserCreate } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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
		tasks: [taskSchema],
	},
	{
		toJSON: {
			transform: (doc: IUserCreate, res: IUserCreate) => {
				delete res.password;
			},
		},
	}
);

module.exports = model('users', userSchema);

export {};
