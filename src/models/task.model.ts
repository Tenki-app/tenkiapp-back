const { Schema } = require('mongoose');
const pomodoroSchema = require('./pomodoro.model');

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	date_task: {
		type: String,
		required: false,
	},
	date_created: {
		type: String,
		required: false,
	},
	time: {
		type: String,
		required: false,
	},
	is_pomodoro: {
		type: Boolean,
		default: false,
	},
	pomodoro: [pomodoroSchema],
});

module.exports = taskSchema;

export {};
