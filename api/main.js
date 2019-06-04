// Sets up dotenv, sets default environment
// variables if not defined
require('./env');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const uuid = require('uuid/v1');
const logger = require('./logger')('main');
require('./db').setup();
const auth = require('./auth');
const routes = require('./routes');
const endpointCoverage = require('./endpointCoverageMiddleware');

const server = express();

endpointCoverage.registerCoverageMiddleware(server);

if (process.env.PROXY_TRUST !== 'false') {
  // If there is a non-false PROXY_TRUST value, use it. If the value is 'true',
  // convert to a boolean to trust everything. This will use the left-most
  // value in X-FORWARDED-FOR as the requestor IP address.
  server.set(
    'trust proxy',
    process.env.PROXY_TRUST === 'true' || process.env.PROXY_TRUST
  );
}

// This endpoint doesn't do anything, but lets us verify that the server is
// online without triggering any other processing - e.g., no authentication,
// no cookie/token processing, etc.
logger.silly('setting up heartbeat endpoint');
server.get('/heartbeat', (_, res) => {
  res.status(204).end();
});

server.use((req, res, next) => {
  req.id = uuid();
  req.meta = {};
  logger.verbose(req, `got ${req.method} request to ${req.path}`);
  return next();
});

logger.silly('setting global middleware');
server.use(compression());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: true }));
server.use(bodyParser.json({ limit: '5mb' }));

// Registers Passport, related handlers, and
// login/logout endpoints
logger.silly('setting up authentication');
auth.setup(server);

logger.silly('setting up routes');
routes(server);

logger.silly('starting the server');
server.listen(process.env.PORT, () => {
  logger.verbose(`server listening on :${process.env.PORT}`);
});
