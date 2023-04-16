export interface ITask {
	id: string;
	title: string;
	description: string;
	state: 'done' | 'pending' | 'progress';
	category: 'today' | 'tomorrow' | 'someday';
	date_task: string;
	date_created: string;
	time: string;
	is_pomodoro: string;
}
