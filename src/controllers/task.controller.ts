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
		resp = { status: 200, message: 'This is the update user', user };
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
