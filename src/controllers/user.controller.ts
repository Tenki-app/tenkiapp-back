const User = require('../models/user.model');

export const getUsers = async (request: any, response: any) => {
	const users = await User.find();
	response.status(200).json(users);
};
