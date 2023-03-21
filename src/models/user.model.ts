const { Schema, model } = require('mongoose');
import { taskSchema } from './task.model';
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	user_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	tasks: [
		{
			type: taskSchema,
			required: true,
		},
	],
});

module.exports = model('tasks', userSchema);
export {};
