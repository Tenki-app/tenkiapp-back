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

const modelPomodoros = model('users', pomodoroSchema);
export { modelPomodoros };
