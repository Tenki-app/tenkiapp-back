import { Request, Response } from 'express';
const User = require('../models/user.model');

export const getTask = async (
	request: Request,
	response: Response
): Promise<void> => {
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

export const getAllTasksByCategory = async (
	request: Request,
	response: Response
): Promise<any> => {
	let resp = {};

	try {
		const { userId, category } = request.params;

		if (!userId || !category) {
			resp = { status: 400, message: 'userId and category are required' };
			return response.status(400).json(resp);
		}
		const user = await User.findById(userId);
		const allTasksByCategory = user.tasks.filter(
			(singleTask: any) => singleTask.category === category
		);
		resp = {
			status: 200,
			message: `All tasks by ${category} category`,
			tasks: allTasksByCategory,
		};
		return response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

export const getAllTasks = async (
	request: Request,
	response: Response
): Promise<void> => {
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

export const postTask = async (
	request: Request,
	response: Response
): Promise<void> => {
	let resp = {};

	try {
		const { userId } = request.params;

		const {
			title,
			description,
			state,
			category,
			date_task,
			pomodoro,
			time,
			is_pomodoro,
		} = request.body;
		const user = await User.findById(userId);

		if (!title || !category) {
			resp = {
				status: 400,
				message: 'Title and category are required',
			};
			response.status(400).json(resp);
			return;
		}

		const taskToCreate = {
			title: title,
			description: description ?? '',
			state: state ?? '',
			category: category,
			date_task: date_task,
			date_created: '',
			time: time ?? '',
			pomodoro: pomodoro ?? [],
			is_pomodoro: !!is_pomodoro,
		};

		user.tasks.push(taskToCreate);

		await user.save();
		resp = {
			status: 200,
			message: 'Task created successfully',
			task: user.tasks[user.tasks.length - 1],
		};
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		console.error(err);
		response.status(404).json(resp);
	}
};

export const putTask = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;

		const user = await User.findById(userId);
		const taskToUpdate = user.tasks.id(taskId);

		Object.assign(taskToUpdate, request.body);

		await user.save();
		resp = {
			status: 200,
			message: 'Task updated',
			task: user.tasks.id(taskId),
		};
		return response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		console.error(err);
		response.status(404).json(resp);
	}
};

export const deleteTask = async (
	request: Request,
	response: Response
): Promise<void> => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;

		const user = await User.findByIdAndUpdate(
			userId,
			{ $pull: { tasks: { _id: taskId } } },
			{ new: true }
		);

		if (!user) {
			resp = {
				status: 404,
				message: 'User not found',
			};
			response.status(404).json(resp);
			return;
		}

		resp = {
			status: 200,
			message: 'the task deleted successfully',
		};
		response.status(200).json(resp);
	} catch (err: any) {
		resp = {
			status: 404,
			name: err.name,
			message: 'Task or user not found',
		};
		response.status(404).json(resp);
	}
};
