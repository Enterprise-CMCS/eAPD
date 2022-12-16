const logger = require('../logger')('api key routes index');
const apdsSubmissions = require('./apds/submissions');

module.exports = (app, { apdsSubmissionsEndpoint = apdsSubmissions } = {}) => {
  logger.debug('setting up routes for apds/submissions');
  apdsSubmissionsEndpoint(app);
};
