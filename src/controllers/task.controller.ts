import { Request, Response } from 'express';
const User = require('../models/task.model');

export const getUsers = async (request: Request, response: Response): Promise<void> => {
	const users = await User.find();
	try {
		response.status(200).json(users);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};
