const { model } = require('mongoose');
const taskSchema = require('./task.model');
let mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
	tasks: [taskSchema],
});

module.exports = model('users', userSchema);

export {};
