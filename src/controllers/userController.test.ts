const app = require('./../app');
const supertest = require('supertest');
const { USERS_ENDPOINTS, TASKS_ENDPOINTS } = require('../utils/endpoint.constants');
/* Testing get all users endpoint */

describe('API test', () => {
	/* it('should response 200 code to get', async () => {
		const endpoint = USERS_ENDPOINTS.USER_BASE_ROUTE;
		const response = await supertest(app).get(endpoint);
	}); */
	it('Should test that true', () => {
		expect(true).toBe(true);
	});
});
