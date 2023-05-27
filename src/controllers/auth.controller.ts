require('dotenv').config();
import { Request, Response } from 'express';
import { IUserCreate } from '../interfaces/user.interface';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;

export const getUserName = async (user_name: string): Promise<IUserCreate> => {
	const user = await User.findOne({ user_name: user_name });
	return user;
};

export const authLogin = async (request: any, response: Response): Promise<void> => {
	let resp;
	try {
		const user = request.user;
		const payload = {
			username: user.user_name,
			role: 'user',
		};
		const accessToken = jwt.sign(payload, accessTokenKey, { expiresIn: '60s' });
		const refreshToken = jwt.sign(payload, refreshTokenKey, { expiresIn: '1d' });

		response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		user.refreshToken = refreshToken;
		user.save();
		response.json({
			user,
			accessToken,
		});
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const authSignup = async (request: any, response: Response): Promise<void> => {};
