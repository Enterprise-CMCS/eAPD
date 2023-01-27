import swaggerUi from 'swagger-ui-express';
import loggerFactory from '../logger/index.js';
import affiliations from './affiliations/index.js';
import apds from './apds/index.js';
import auth from './auth/index.js';
import docs from './docs/index.js';
import roles from './roles/index.js';
import states from './states/index.js';
import users from './users/index.js';
import openAPI from './openAPI/index.js';

const logger = loggerFactory('routes index');

// ############### ROUTE IMPORT INSERTION POINT #######################
export default (
  app,
  {
    affiliationsEndpoint = affiliations,
    apdsEndpoint = apds,
    authEndpoint = auth,
    docsEndpoint = docs,
    rolesEndpoint = roles,
    statesEndpoint = states,
    usersEndpoint = users,
    openAPIdoc = openAPI
  } = {}
) => {
  logger.debug('setting up routes for affiliations');
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

  // ############### ROUTE REGISTRATION INSERTION POINT #######################
  logger.debug('setting up route for OpenAPI');

  app.get('/open-api', (req, res) => {
    logger.verbose({ id: req.id, message: 'sending OpenAPI documentation' });
    res.send(openAPIdoc);
  });

  logger.debug('setting out route for API docs');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIdoc));
};
