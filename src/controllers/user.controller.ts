const User = require('../models/user.model');

export const getUsers = async (request: any, response: any) => {
	const users = await User.find();
	response.status(200).json(users);
};

export const postUsers = async (request: any, response: any) => {
	const { name, user_name, password, email } = request.body;
	const newUser = new User({
		name,
		user_name,
		password,
		email,
	});

	try {
		await newUser.save();
		const resp = {
			message: 'User saved',
			userData: newUser,
		};
		response.status(201).json(resp);
	} catch (error: any) {
		response.status(400).json({ message: 'Bad request' });
	}
};
