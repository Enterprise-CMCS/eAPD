require('./env');

const express = require('express');
const cors = require('cors');

const auth = require('./auth');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());

auth.setup(server);

server.get('*', (req, res) => {
  res.send({ hello: 'world' });
});

server.listen(process.env.PORT);
