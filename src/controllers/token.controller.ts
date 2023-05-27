require('dotenv').config();
import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const refreshTokenKey = process.env.REFRESH_TOKEN_SECRET;
const accessTokenKey = process.env.ACCESS_TOKEN_SECRET;

export const handleRefreshToken = async (request: Request, response: Response): Promise<Response> => {
	let resp;
	try {
		const cookies = request.cookies;
		if (!cookies?.jwt) {
			resp = { status: 401, message: 'Unauthorized' };
			return response.status(401).json(resp);
		}
		const refreshToken = cookies.jwt;

		const foundUser = User.findOne({ refreshToken: refreshToken });

		if (!foundUser) {
			resp = { status: 401, message: 'Forbidden' };
			return response.status(403).json(resp);
		}

		jwt.verify(refreshToken, refreshTokenKey, (err: any, decoded: any) => {
			if (err || foundUser.user_name !== decoded.user_name) {
				resp = { status: 403, message: 'Monda' };
				return response.status(403).json(resp);
			}
			const accessToken = jwt.sign({ username: decoded.user_name, role: decoded.role }, accessTokenKey, { expiresIn: '60s' });
			resp = { status: 201, accessToken: accessToken };
			response.json(resp);
		});

		return response;
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};
