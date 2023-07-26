import { Request, Response } from 'express';
const User = require('../models/user.model');

export const getTask = async (request: Request, response: Response): Promise<void> => {
	let resp = {};

	try {
		const { userId, taskId } = request.params;
		const user = await User.findById(userId);
		const task = user.tasks.id(taskId);
		resp = { status: 200, message: 'Task data', task };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const getTasks = async (request: Request, response: Response): Promise<void> => {
	let resp = {};

	try {
		const { userId } = request.params;
		const user = await User.findById(userId);
		resp = { status: 200, message: 'Tasks data', tasks: user.tasks };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const postTask = async (request: Request, response: Response): Promise<void> => {
	let resp = {};

	try {
		const { userId } = request.params;
		const { title, description, state, category, time, is_pomodoro, date_task, pomodoro } =
			request.body;
		const user = await User.findById(userId);
		user.tasks.push({
			title: title ?? '',
			description: description ?? '',
			state: state ?? '',
			category: category ?? '',
			date_task: '' ?? '',
			date_created: '' ?? '',
			time: '' ?? '',
			is_pomodoro: false,
			pomodoro: pomodoro ?? [],
		});

		await user.save();
		resp = { status: 200, message: 'Task update', task: user.tasks[user.tasks.length - 1] };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const putTask = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;

		const user = await User.findById(userId);
		Object.assign(user.tasks.id(taskId), request.body);

		await user.save();
		resp = { status: 200, message: 'Task updated', task: user.tasks.id(taskId) };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		console.error(err);
		response.status(404).json(resp);
	}
};

export const deleteTask = async (request: Request, response: Response): Promise<void> => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;
		const user = await User.findById(userId);
		const task = user.tasks.pop(taskId);
		await user.save();
		resp = { status: 200, message: 'the user was deleted succesfully', task };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Task or user not found' };
		response.status(404).json(resp);
	}
};
