const request = require('supertest');
const server = require('./server');
const db = require('../data/db');

// before and after Each or before and after All
afterEach(async () => {
	await db('games').truncate();
});

describe('server', () => {
	it('should handle GET properly', async () => {
		const serverResults = await request(server).get('/games');
		const dbResults = await db('games');
		expect(serverResults.text).toBe(JSON.stringify(dbResults)); //TEST #1
	});

	it('should handle GET properly', async () => {
		const serverResults = await request(server).get('/games');
		expect(serverResults.status).toBe(200); //TEST #2
	});

	it('should FAIL to handle GET improperly', async () => {
		const serverResults = await request(server).get('/games2g5r');
		expect(serverResults.status).toBe(404); //TEST #3 --GET IS COMPLETED
	});

	it('should handle POST properly', async () => {
		const serverResults = await request(server)
			.post('/add')
			.send({title: 'tetris', genre: 'arcade', releaseYear: 1980});
		const dbResults = await db('games');
		expect(serverResults.text).toBe(`[${[dbResults[0].id]}]`); //TEST #1
	});

	it('should handle POST properly', async () => {
		const serverResults = await request(server)
			.post('/add')
			.send({title: 'tetris', genre: 'arcade', releaseYear: 1980});
		expect(serverResults.status).toBe(201); //TEST #2
	});

	it('should FAIL to handle POST improperly', async () => {
		const serverResults = await request(server).post('/games2g5r');
		expect(serverResults.status).toBe(404); //TEST #3 --POST IS COMPLETED
	});
});
