import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces/user.interface';

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

export const getUserName = async (user_name: string): Promise<IUserCreate> => {
	const user = await User.findOne({ user_name: user_name });
	return user;
};

export const authLogin = async (request: Request, response: Response): Promise<void> => {
	let resp;
	try {
		response.json(request.body);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};
