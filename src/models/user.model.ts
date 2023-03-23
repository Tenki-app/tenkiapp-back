const { Schema, model } = require('mongoose');

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
			type: Schema.Types.ObjectId,
			ref: 'tasks',
		},
	],
});

const modelUser = model('users', userSchema);
export { modelUser };
