import { Request, Response } from 'express';

import { userSignInPostSchema } from '../schemas/user';

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

export const getUsers = async (
	request: Request,
	response: Response
): Promise<void> => {
	let resp = {};
	try {
		const users = await User.find();
		resp = { status: 200, message: 'These are the users', users };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const getUser = async (
	request: Request,
	response: Response
): Promise<void> => {
	let resp = {};
	try {
		const { id } = request.params;
		const user = await User.findById(id);
		resp = { status: 200, message: 'This is the user', user };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const putUser = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { id } = request.params;
		const user = await User.findByIdAndUpdate(id, request.body, {
			new: true,
		});
		resp = { status: 200, message: 'This is the update user', user };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const postUser = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { name, user_name, email } = request.body;
		const newUser = new User({
			name,
			user_name,
			email,
		});
		await newUser.save();
		resp = {
			status: 201,
			message: 'User saved',
			userData: newUser,
		};
		response.status(201).json(resp);
	} catch (err: any) {
		resp = { status: 400, name: err.name, message: 'Bad request' };
		response.status(400).json(resp);
	}
};

export const deleteUser = async (
	request: Request,
	response: Response
): Promise<void> => {
	let resp = {};
	try {
		const { id } = request.params;
		const usuario = await User.findByIdAndDelete(id);
		resp = {
			status: 204,
			message: 'the user was deleted successfully',
			userData: usuario,
		};
		response.status(204).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'User not found' };
		response.status(404).json(resp);
	}
};

export const postSignInUser = async (
	request: Request,
	response: Response
): Promise<Response> => {
	let resp = {};
	try {
		const userRequest = request.body;

		const { error: schemasError } =
			userSignInPostSchema.validate(userRequest);

		if (schemasError) {
			return response.status(400).json(schemasError);
		}

		const userExist = await User.find({ email: userRequest.email });

		if (userExist) {
			resp = {
				status: 200,
				message: 'User logged successfully',
				user: userExist,
			};
			return response.status(200).json(resp);
		} else {
			const newUser = new User({
				name: userRequest.name,
				user_name: userRequest.user_name,
				email: userRequest.email,
			});
			await newUser.save();

			resp = {
				status: 201,
				message: 'User created successfully',
				user: newUser,
			};
			return response.status(201).json(resp);
		}
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'User not found' };
		return response.status(404).json(resp);
	}
};
