const { model } = require('mongoose');
const taskSchema = require('./task.model');
let mongoose = require('mongoose');

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
		email: {
			type: String,
			required: true,
		},
		tasks: [taskSchema],
	},
	{
		toJSON: {
			transform: (doc: any, res: any) => {
				res.id = res._id;
				delete res._id;
				delete res.__v;
			},
		},
	}
);

export = model('users', userSchema);
