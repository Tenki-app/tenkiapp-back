const { Schema, model } = require('mongoose');
const pomodoroSchema = new Schema({
	work_time: {
		type: Number,
		required: true,
	},
	break_time: {
		type: Number,
		required: true,
	},
	rounds: {
		type: Number,
		required: true,
	},
});

module.exports = model('pomodoros', pomodoroSchema);
export {};
