import { ITask } from '../interfaces/task.interface';
import { Request, Response } from 'express';
const User = require('../models/user.model');

export const getTask = async (request: Request, response: Response): Promise<void> => {
	let resp = {};

	try {
		const { userId, taskId } = request.params;

		const user = await User.findById(userId);
		const task = user.tasks.find((taskItem: ITask) => taskItem.id === taskId);

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
		const { title, description, state, category, date_task, date_created, time, is_pomodoro } = request.body;

		const user = await User.findById(userId);
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
		resp = { status: 200, message: 'Task update', user };
		response.status(200).json(resp);
	} catch (err: any) {
		resp = { status: 404, name: err.name, message: 'Resource not found' };
		response.status(404).json(resp);
	}
};

/* 
{
	"title": "Sacar al perro",
	"description": "Sacar al perro ome",
	"state": "in progress",
	"category": "next",
	"date_task": "2023/04/12",
	"date_created": "2023/04/11",
	"time": "09:00",
	"is_pomodoro": false,
}

​http://localhost:3001/api/tasks/642f43f148a58e925bd721b3
​http://localhost:3001/api/users
*/
