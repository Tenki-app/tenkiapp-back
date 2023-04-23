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
});
