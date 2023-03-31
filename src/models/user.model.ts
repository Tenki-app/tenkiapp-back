const { Schema, model } = require('mongoose');
const taskSchema = require('./task.model');

const userSchema = new Schema({
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
});

module.exports = model('users', userSchema);

export {};
