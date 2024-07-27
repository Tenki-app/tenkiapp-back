import { Request, Response } from 'express';
const User = require('../models/user.model');

export const getTask = async (request: Request, response: Response) => {
	let resp = {};

	try {
		const { userId, taskId } = request.params;
		const user = await User.findById(userId);

		const task = user.tasks.id(taskId);

		if (!task || task.is_deleted) {
			resp = { status: 404, message: 'Task not found' };
			return response.status(404).json(resp);
		}

		resp = { status: 200, message: 'Task data', task };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};

export const getAllTasksByCategory = async (
	request: Request,
	response: Response
) => {
	let resp = {};

	try {
		const { userId, category } = request.params;

		if (!userId || !category) {
			resp = { status: 400, message: 'userId and category are required' };
			return response.status(400).json(resp);
		}

		const user = await User.findById(userId);

		if (!user) {
			resp = { status: 404, message: 'User not found' };
			return response.status(404).json(resp);
		}

		const allTasksByCategory = user.tasks.filter(
			(task: any) => task.category === category && !task.is_deleted
		);

		resp = {
			status: 200,
			message: `All tasks by ${category} category`,
			tasks: allTasksByCategory,
		};
		return response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};

export const getAllTasks = async (request: Request, response: Response) => {
	let resp = {};

	try {
		const { userId } = request.params;

		if (!userId) {
			resp = { status: 400, message: 'userId is required' };
			return response.status(400).json(resp);
		}

		const user = await User.findById(userId);

		if (!user) {
			resp = { status: 404, message: 'User not found' };
			return response.status(404).json(resp);
		}

		const allTasks = user.tasks.filter((task: any) => !task.is_deleted);

		resp = { status: 200, message: 'Tasks data', tasks: allTasks };

		return response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		return response.status(404).json(resp);
	}
};

export const postTask = async (request: Request, response: Response) => {
	let resp = {};

	try {
		const { userId } = request.params;

		if (!userId) {
			resp = { status: 400, message: 'user id is required' };
			return response.status(400).json(resp);
		}

		const user = await User.findById(userId);
		if (!user) {
			resp = { status: 404, message: 'User not found' };
			return response.status(404).json(resp);
		}

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

		if (!title || !category) {
			resp = {
				status: 400,
				message: 'Title and category are required',
			};
			return response.status(400).json(resp);
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
			is_deleted: false,
		};

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { tasks: taskToCreate } },
			{ new: true, useFindAndModify: false }
		);
		if (!updatedUser) {
			resp = {
				status: 500,
				message: 'Failed to update user with new task',
			};
			return response.status(500).json(resp);
		}

		resp = {
			status: 200,
			message: 'Task created successfully',
			task: user.tasks[user.tasks.length - 1],
		};
		return response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		console.error(err);
		return response.status(404).json(resp);
	}
};

export const putTask = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;

		if (!userId || !taskId) {
			resp = { status: 400, message: 'userId and taskId are required' };
			return response.status(400).json(resp);
		}

		const user = await User.findById(userId);
		if (!user) {
			resp = { status: 404, message: 'User not found' };
			return response.status(404).json(resp);
		}

		const taskToUpdate = user.tasks.id(taskId);
		if (!taskToUpdate || taskToUpdate.is_deleted) {
			resp = { status: 404, message: 'Task not found' };
			return response.status(404).json(resp);
		}

		taskToUpdate.set(request.body);

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
		return response.status(404).json(resp);
	}
};

export const deleteTask = async (request: Request, response: Response) => {
	let resp = {};
	try {
		const { userId, taskId } = request.params;

		const userToUpdate = await User.findOneAndUpdate(
			{ _id: userId, 'tasks._id': taskId },
			{ $set: { 'tasks.$.is_deleted': true } },
			{ new: true }
		);

		if (!userToUpdate) {
			resp = {
				status: 404,
				message: 'User not found',
			};
			return response.status(404).json(resp);
		}
		if (userToUpdate.tasks.length === 0) {
			resp = {
				status: 404,
				message: 'Task not found',
			};
			return response.status(404).json(resp);
		}

		resp = {
			status: 200,
			message: 'Task deleted successfully',
		};
		return response.status(200).json(resp);
	} catch (err: any) {
		resp = {
			status: 404,
			name: err.name,
			message: 'Task or user not found',
		};
		return response.status(404).json(resp);
	}
};
