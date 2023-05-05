const app = require('./../index');
const supertest = require('supertest');
const { USERS_ENDPOINTS, TASKS_ENDPOINTS } = require('../utils/endpoint.constants');
/* Testing get all users endpoint */

describe('API test', () => {
	it('Should test that true', () => {
		expect(true).toBe(true);
	});
	it('should response 200 code to get', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		await supertest(app).get(endpoint).expect(200);
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
});
