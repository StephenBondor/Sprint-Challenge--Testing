const express = require('express');
const helmet = require('helmet');
const db = require('../data/db');

const server = express();

server.use(express.json());
server.use(helmet());

//endpoint sanity check
server.get('/', (req, res) => {
	res.send('api working');
});

// list whatever
server.get('/games', (req, res) => {
	db('games')
		.then(things => {
			res.status(200).json(things);
		})
		.catch(err => res.status(404).json(err));
});

// add whatever to whatever table
server.post('/add', (req, res) => {
	const body = req.body;
	db('games')
		.insert(body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(422).json(err);
		});
});

module.exports = server;
