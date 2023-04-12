import { Request, Response } from 'express';
const Task = require('../models/task.model');
const User = require('../models/user.model');

export const postTasks = async (request: Request, response: Response): Promise<void> => {
	let resp = {};

	try {
		const { id } = request.params;
		const { title, description, state, category, date_task, date_created, time, is_pomodoro } = request.body;
		const user = await User.findById(id);
		user.tasks.push({
			title,
			description,
			state,
			category,
			date_task,
			date_created,
			time,
			is_pomodoro,
		});

		await user.save();
		resp = { status: 200, message: 'This is the updated user', user };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
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
