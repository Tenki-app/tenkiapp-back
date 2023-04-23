require('dotenv').config();
import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces/user.interface';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwtKey = process.env.JWT_KEY;

export const getUserName = async (user_name: string): Promise<IUserCreate> => {
	const user = await User.findOne({ user_name: user_name });
	return user;
};

export const authLogin = async (request: any, response: Response): Promise<void> => {
	let resp;
	try {
		const user = request.user;
		const payload = {
			sub: user.id,
			role: 'user',
		};
		const token = jwt.sign(payload, jwtKey);
		response.json({
			user,
			token,
		});
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};
