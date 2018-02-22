const logger = require('../logger')('routes index');
const activities = require('./activities');
const roles = require('./roles');
const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles,
  usersEndpoint = users,
  formLoggerEndopint = formLogger,
  openAPIdoc = openAPI
) => {
  logger.silly('setting up routes for activities');
  activitiesEndpoint(app);
  logger.silly('setting up routes for roles');
  rolesEndpoint(app);
  logger.silly('setting up routes for users');
  usersEndpoint(app);
  logger.silly('setting up routes for form logger');
  formLoggerEndopint(app);

  logger.silly('setting up route for OpenAPI');
  app.get('/open-api', (req, res) => {
    logger.verbose('sending OpenAPI documentation');
    res.send(openAPIdoc);
  });
};
