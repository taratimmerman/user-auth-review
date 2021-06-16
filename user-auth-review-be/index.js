require('dotenv').config();

const path = require('path');
const express = require('express');

const server = require('./api/server');

const port = process.env.PORT;

server.use(express.static(path.join(__dirname, 'client/dist')));

server.get('/', (req, res) => {
  res.json({ message: 'Node backend created to practice and review user registration, login, authentication, and authorization.' });
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`\n Server listening on port ${port} \n`);
});