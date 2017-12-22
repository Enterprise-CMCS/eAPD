require('./env');
1;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth');
const routes = require('./routes');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(bodyParser.json());

auth.setup(server);

routes(server);

server.listen(process.env.PORT);
