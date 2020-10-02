const express = require('express');
const server = express();

server.use(express.json());

const postRouter = require('./express-router.js');
server.use('/api/posts', postRouter);

// separate endpoints that begin with /api/posts in separate express router 

server.get('/', (req, res) => {
  res.status(200).json({ message: 'unit4 mod2 project: routing module project '});
});

module.exports = server;