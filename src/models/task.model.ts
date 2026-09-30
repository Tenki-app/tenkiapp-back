const { Schema } = require('mongoose');
const pomodoroSchema = require('./pomodoro.model');

const taskSchema = new Schema(
	{
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
			type: Date,
			required: false,
			default: Date.now,
		},
		date_created: {
			type: Date,
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
		is_deleted: {
			type: Boolean,
			default: false,
		},
		date_done: {
			type: Date,
			required: false,
		},
		pomodoro: {
			type: [pomodoroSchema],
			default: [],
		},
	},
	{
		toJSON: {
			transform: (doc: any, res: any) => {
				res.id = res._id;
				delete res._id;
			},
		},
	}
);

export = taskSchema;
