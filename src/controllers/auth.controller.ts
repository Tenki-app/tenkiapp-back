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
		if (request.user.code === 401) {
			response.status(401).json({
				...request.user,
			});
		} else {
			const user = request.user;
			const payload = {
				username: user.user_name,
				role: 'user',
			};
			const accessToken = jwt.sign(payload, accessTokenKey, { expiresIn: '15m' });
			const refreshToken = jwt.sign(payload, refreshTokenKey, { expiresIn: '1w' });

			response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
			user.refreshToken = refreshToken;
			user.save();

			const userToSend = JSON.parse(JSON.stringify(user));
			delete userToSend.tasks;

			response.json({
				user: userToSend,
				accessToken,
			});
		}
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const authGoogle = async (request: Request, response: Response): Promise<Response> => {
	let resp;
	try {
		const user = request.body;
		const existUser = await User.findOne({ user_name: user.email });

		const payload = {
			user: user.email,
			role: 'user',
		};

		const accessToken = jwt.sign(payload, accessTokenKey, { expiresIn: '15m' });
		const refreshToken = jwt.sign(payload, refreshTokenKey, { expiresIn: '1w' });

		if (existUser) {
			response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
			existUser.refreshToken = refreshToken;
			existUser.save();

			const userToSend = JSON.parse(JSON.stringify(existUser));
			delete userToSend.tasks;
			console.log(userToSend);

			return response.status(200).json({
				user: userToSend,
				accessToken,
			});
		}
		const passwordHash = await bcrypt.hash(user.password, 10);
		response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		const newUser = new User({
			user_name: user.email,
			password: passwordHash,
			email: user.email,
			name: '',
			refreshToken: refreshToken,
		});
		await newUser.save();

		return response.status(200).json({
			user: newUser,
			accessToken,
		});
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		console.log('err: ', err);
		return response.status(404).json(resp);
	}
};

export const authSignup = async (request: Request, response: Response): Promise<Response> => {
	let resp;
	try {
		const { user_name, password, email, name } = request.body;

		const existUser = await User.findOne({ user_name: user_name });

		if (existUser) {
			resp = { status: 409, message: 'User already exist' };
			return response.status(409).json(resp);
		}

		const payload = {
			username: user_name,
			role: 'user',
		};

		const passwordHash = await bcrypt.hash(password, 10);
		const accessToken = jwt.sign(payload, accessTokenKey, { expiresIn: '15m' });
		const refreshToken = jwt.sign(payload, refreshTokenKey, { expiresIn: '1w' });

		response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

		const newUser = new User({
			user_name: user_name,
			password: passwordHash,
			email: email,
			name: name,
			refreshToken: refreshToken,
		});
		await newUser.save();

		return response.status(200).json({
			accessToken: accessToken,
			user: newUser,
		});
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};

export const handleLogout = async (request: Request, response: Response): Promise<Response> => {
	let resp;
	try {
		const cookies = request.cookies;
		if (!cookies?.jwt) {
			resp = { status: 204, message: 'There is not any resource coincidences' };
			return response.status(204).json(resp);
		}

		const refreshToken = cookies.jwt;
		const foundUser = await User.findOne({ refreshToken: refreshToken });
		if (!foundUser) {
			response.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
			resp = { status: 403, message: 'Forbidden access' };
			return response.status(403).json(resp);
		}

		foundUser.refreshToken = '';

		// add in production: secure = true / this only allow https serves
		response.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		await foundUser.save();

		resp = { status: 204, message: 'Logout successfully' };
		return response.status(204).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};
