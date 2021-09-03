const swaggerUi = require('swagger-ui-express');
const logger = require('../logger')('routes index');
const affiliations = require('./affiliations');
const apds = require('./apds');
const auth = require('./auth');
const docs = require('./docs');
const roles = require('./roles');
const states = require('./states');
const users = require('./users');
const openAPI = require('./openAPI');

module.exports = (
  app,
  affiliationsEndpoint = affiliations,
  apdsEndpoint = apds,
  authEndpoint = auth,
  docsEndpoint = docs,
  rolesEndpoint = roles,
  statesEndpoint = states,
  usersEndpoint = users,
  openAPIdoc = openAPI
) => {
  logger.debug('setting up routes for affilitions');
  affiliationsEndpoint(app);
  logger.debug('setting up routes for apds');
  apdsEndpoint(app);
  logger.debug('setting up routes for auth');
  authEndpoint(app);
  logger.debug('setting up routes for docs');
  docsEndpoint(app);
  logger.debug('setting up routes for roles');
  rolesEndpoint(app);
  logger.debug('setting up routes for states');
  statesEndpoint(app);
  logger.debug('setting up routes for users');
  usersEndpoint(app);

  logger.debug('setting up route for OpenAPI');

  app.get('/open-api', (req, res) => {
    logger.verbose({ id: req.id, message: 'sending OpenAPI documentation' });
    res.send(openAPIdoc);
  });

  logger.debug('setting out route for API docs');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIdoc));

};
