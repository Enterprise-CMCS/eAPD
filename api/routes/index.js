const swaggerUi = require('swagger-ui-express');
const logger = require('../logger')('routes index');
const affiliations = require('./affiliations');
const apds = require('./apds');
const apdsEvents = require('./apds/events');
const apdsFiles = require('./apds/files');
const apdsBudget = require('./apds/budget');
const auth = require('./auth');
const docs = require('./docs');
const roles = require('./roles');
const states = require('./states');
const stateAffiliations = require('./states/affilitations');
const users = require('./users');
const openAPI = require('./openAPI');

// ############### ROUTE IMPORT INSERTION POINT #######################
module.exports = (
  app,
  {
    affiliationsEndpoint = affiliations,
    apdsEndpoint = apds,
    apdsEventsEndpoint = apdsEvents,
    apdsFilesEndpoint = apdsFiles,
    apdsBudgetEndpoint = apdsBudget,
    authEndpoint = auth,
    docsEndpoint = docs,
    rolesEndpoint = roles,
    statesEndpoint = states,
    stateAffiliationEndpoint = stateAffiliations,
    usersEndpoint = users,
    openAPIdoc = openAPI
  } = {}
) => {
  logger.debug('setting up routes for affiliations');
  affiliationsEndpoint(app);
  logger.debug('setting up routes for apds');
  apdsEndpoint(app);
  logger.debug('setting up routes for apds/events');
  apdsEventsEndpoint(app);
  logger.debug('setting up routes for apds/files');
  apdsFilesEndpoint(app);
  logger.debug('setting up routes for apds/budget');
  apdsBudgetEndpoint(app);
  logger.debug('setting up routes for auth');
  authEndpoint(app);
  logger.debug('setting up routes for docs');
  docsEndpoint(app);
  logger.debug('setting up routes for roles');
  rolesEndpoint(app);
  logger.debug('setting up routes for states');
  statesEndpoint(app);
  logger.debug('setting up routes for states/affiliation');
  stateAffiliationEndpoint(app);
  logger.debug('setting up routes for users');
  usersEndpoint(app);

  // ############### ROUTE REGISTRATION INSERTION POINT #######################
  logger.debug('setting up route for OpenAPI');

  app.get('/open-api', (req, res) => {
    logger.verbose({ id: req.id, message: 'sending OpenAPI documentation' });
    res.send(openAPIdoc);
  });

  logger.debug('setting out route for API docs');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIdoc));
};
