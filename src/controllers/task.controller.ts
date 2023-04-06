import { Request, Response } from 'express';
const Task = require('../models/task.model');

export const getTasks = async (request: Request, response: Response): Promise<void> => {
	const users = await Task.find();
	try {
		response.status(200).json(users);
	} catch (err: any) {
		response.status(404).json({ status: 404, name: err.name, message: 'Resource not found' });
	}
};

export const postTask = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { title, state, category, date_task, date_created, time, is_pomodoro } = request.body;
		const newTask = new Task({});
		await newTask.save();
		resp = {
			status: 201,
			message: 'User saved',
			userData: newTask,
		};
		response.status(201).json(resp);
	} catch (err: any) {
		resp = { status: 400, name: err.name, message: 'Bad request' };
		response.status(400).json(resp);
	}
};
