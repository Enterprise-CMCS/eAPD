const logger = require('../logger')('routes index');
const loggedIn = require('../auth/middleware').loggedIn;
const activities = require('./activities');
const roles = require('./roles');
const states = require('./states');
const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles,
  statesEndpoint = states,
  usersEndpoint = users,
  formLoggerEndopint = formLogger,
  openAPIdoc = openAPI
) => {
  app.get('/me', loggedIn, (req, res) => {
    res.send(req.user);
  });

  logger.silly('setting up routes for activities');
  activitiesEndpoint(app);
  logger.silly('setting up routes for roles');
  rolesEndpoint(app);
  logger.silly('setting up routes for states');
  statesEndpoint(app);
  logger.silly('setting up routes for users');
  usersEndpoint(app);
  logger.silly('setting up routes for form logger');
  formLoggerEndopint(app);

  logger.silly('setting up route for OpenAPI');
  app.get('/open-api', (req, res) => {
    logger.verbose(req, 'sending OpenAPI documentation');
    res.send(openAPIdoc);
  });
};
