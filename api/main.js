require('./env');
const express = require('express');

const server = express();

server.get('*', (req, res) => {
  res.send({ hello: 'world' });
});

server.listen(process.env.PORT);
