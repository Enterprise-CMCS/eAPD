const logger = require('../logger')('routes index');
const auth = require('./auth');
const apds = require('./apds');
const me = require('./me');
const users = require('./users');
const openAPI = require('./openAPI');

module.exports = (
  app,
  apdsEndpoint = apds,
  authEndpoint = auth,
  meEndpoint = me,
  usersEndpoint = users,
  openAPIdoc = openAPI
) => {
  logger.silly('setting up routes for apds');
  apdsEndpoint(app);
  logger.silly('setting up routes for auth');
  authEndpoint(app);
  logger.silly('setting up routes for me');
  meEndpoint(app);
  logger.silly('setting up routes for users');
  usersEndpoint(app);

  logger.silly('setting up route for OpenAPI');
  app.get('/open-api', (req, res) => {
    logger.verbose(req, 'sending OpenAPI documentation');
    res.send(openAPIdoc);
  });
};
