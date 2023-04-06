import { Request, Response } from 'express';
const User = require('../models/user.model');

export const getUsers = async (request: Request, response: Response) => {
	const users = await User.find();
	try {
		response.status(200).json(users);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};

export const getUser = async (request: Request, response: Response) => {
	const { id } = request.params;
	const user = await User.findById(id);
	try {
		response.status(200).json(user);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};

export const putUser = async (request: Request, response: Response) => {
	const { id } = request.params;
	//const { name, user_name, password, email };
	const user = await User.findByIdAndUpdate(id, request.body, { new: true });
	console.log('monda: ', request.body);
	try {
		response.status(200).json(user);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};

export const postUsers = async (request: Request, response: Response) => {
	console.log('post: ', request.body);
	try {
		const { name, user_name, password, email } = request.body;
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
		response.status(400).json({ status: 400, name: err.name, message: 'Bad request' });
	}
};

export const deleteUser = async (request: Request, response: Response) => {
	const { id } = request.params;
	const usuario = await User.findByIdAndDelete(id);
	response.json(usuario);
};
