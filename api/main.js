require('./env');
const fs = require('fs');
const logger = require('./logger')('main');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
require('./db').setup();
const auth = require('./auth');
const routes = require('./routes');

const server = express();

if (process.env.ENDPOINT_COVERAGE_CAPTURE) {
  server.use((req, res, next) => {
    const end = res.end.bind(res);
    res.end = (...args) => {
      let path = req.path;
      if (req.route) {
        path = req.route.path;
      }
      const result = {
        path,
        method: req.method,
        status: res.statusCode
      };
      fs.appendFileSync('./endpoints-hit.txt', `${JSON.stringify(result)}\n`);
      return end(...args);
    };

    next();
  });
}

server.use((req, res, next) => {
  req.id = uuid();
  logger.verbose(req, `got ${req.method} request to ${req.path}`);
  return next();
});

logger.silly('setting global middleware');
server.use(express.urlencoded({ extended: true }));
server.use(cors({ credentials: true, origin: true }));
server.use(bodyParser.json());

logger.silly('setting up authentication');
auth.setup(server);

logger.silly('setting up routes');
routes(server);

logger.silly('starting the server');
server.listen(process.env.PORT, () => {
  logger.verbose(`server listening on :${process.env.PORT}`);

  if (process.env.ENDPOINT_COVERAGE_CAPTURE) {
    const allRoutes = server._router.stack // eslint-disable-line no-underscore-dangle
      .filter(a => !!a.route)
      .map(({ route: { path, methods } }) => ({
        path,
        method: Object.keys(methods)[0]
      }));
    fs.writeFileSync('./endpoints-all.txt', JSON.stringify(allRoutes));
  }
});
