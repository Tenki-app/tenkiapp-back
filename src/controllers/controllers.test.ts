const app = require('./../index');
const supertest = require('supertest');
const { USERS_ENDPOINTS, TASKS_ENDPOINTS } = require('../utils/endpoint.constants');
describe('Tasks API test', () => {});

describe('API test', () => {
	/* USERS */
	it('Should test that true', () => {
		expect(true).toBe(true);
	});

	it('should response 200 code to get', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		await supertest(app).get(endpoint).expect(200);
	});

	it('should response 200 code to get an user', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE + '/64546b17fb9c285f208b2063';
		await supertest(app).get(endpoint).expect(200);
	});

	it('should response 404 code to get an user', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE + '/645454';
		await supertest(app).get(endpoint).expect(404);
	});

	it('should response 201 code to post', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		await supertest(app)
			.post(endpoint)
			.send({
				name: 'Test',
				user_name: 'Test',
				password: 'Test',
				email: 'Test',
			})
			.expect(201);
	});

	it('should response 404 code to post', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		await supertest(app).post(endpoint).expect(400);
	});

	it('should response 200 code to put', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE + '/64546b17fb9c285f208b2063';
		await supertest(app)
			.put(endpoint)
			.send({
				name: 'TestUpdate',
				user_name: 'TestUpdate',
				password: 'TestUpdate',
				email: 'TestUpdate',
			})
			.expect(200);
	});

	it('should response 404 code to put', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE + '/774';
		await supertest(app)
			.put(endpoint)
			.send({
				name: 'TestUpdate',
				user_name: 'TestUpdate',
				password: 'TestUpdate',
				email: 'TestUpdate',
			})
			.expect(404);
	});

	/* it('should response 204 code to delete', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		const response = await supertest(app).get(endpoint);
		const registers = response.body;
		const registerToDelete = registers[0];
		const endpointDelete = endpoint + `${registerToDelete._id}`;
		await supertest(app).delete(endpointDelete).expect(204);
	}); */

	/* TASKS */
	it('should response 200 code to get tasks', async () => {
		const endpoint = TASKS_ENDPOINTS.TASK_BASE_ROUTE + '/64546b17fb9c285f208b2063';
		await supertest(app).get(endpoint).expect(200);
	});
	it('should response 404 code to get tasks', async () => {
		const endpoint = TASKS_ENDPOINTS.TASK_BASE_ROUTE;
		await supertest(app).get(endpoint).expect(404);
	});
	it('should response 404 code to post a task', async () => {
		const endpoint = TASKS_ENDPOINTS.TASK_BASE_ROUTE + '/64546b17fb9c285f208b2063';

		await supertest(app)
			.post(endpoint)
			.send({
				title: 'Test',
				description: 'Test',
				state: 'Test',
				category: 'Test',
				date_task: 'Test',
				date_created: 'Test',
				time: 'Test',
				is_pomodoro: 'Test',
			})
			.expect(404);
	});
});
export {};
