import { Request, Response } from 'express';
const User = require('../models/user.model');

export const postUsers = async (request: any, response: any) => {
	const { name, user_name, password, email } = request.body;
	try {
		const newUser = new User({
			name,
			user_name,
			password,
			email,
		});
		await newUser.save();
		const resp = {
			message: 'User saved',
			userData: newUser,
		};
		response.status(201).json(resp);
	} catch (err: any) {
		if (err.name === 'ValidationError') {
			response.status(400).json({ status: 400, name: err.name, message: 'Bad request' });
		}
	}
};
export const getUsers = async (request: Request, response: Response) => {
	const users = await User.find();
	try {
		response.status(200).json(users);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};
