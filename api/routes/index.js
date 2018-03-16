const logger = require('../logger')('routes index');
const loggedIn = require('../auth/middleware').loggedIn;
const auth = require('./auth');
const apds = require('./apds');
const states = require('./states');
const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  apdsEndpoint = apds,
  authEndpoint = auth,
  statesEndpoint = states,
  usersEndpoint = users,
  formLoggerEndpoint = formLogger,
  openAPIdoc = openAPI
) => {
  app.get('/me', loggedIn, (req, res) => {
    res.send(req.user);
  });

  logger.silly('setting up routes for apds');
  apdsEndpoint(app);
  logger.silly('setting up routes for auth');
  authEndpoint(app);
  logger.silly('setting up routes for states');
  statesEndpoint(app);
  logger.silly('setting up routes for users');
  usersEndpoint(app);
  logger.silly('setting up routes for form logger');
  formLoggerEndpoint(app);

  logger.silly('setting up route for OpenAPI');
  app.get('/open-api', (req, res) => {
    logger.verbose(req, 'sending OpenAPI documentation');
    res.send(openAPIdoc);
  });
};
