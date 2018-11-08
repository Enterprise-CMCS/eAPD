const logger = require('../../logger')('apds route index');
const get = require('./get');
const post = require('./post');
const put = require('./put');
const activities = require('./activities');
const status = require('./status/put.js');
const submitted = require('./submitted/get');
const versions = require('./versions');

module.exports = (
  app,
  getEndpoint = get,
  postEndpoint = post,
  putEndpoint = put,
  activitiesEndpoints = activities,
  statusEndpoints = status,
  submittedEndpoints = submitted,
  versionsEndpoints = versions
) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);

  logger.silly('setting up APD activities endpoints');
  activitiesEndpoints(app);

  logger.silly('setting up APD status endpoints');
  statusEndpoints(app);

  logger.silly('setting up submitted APD endpoints');
  submittedEndpoints(app);

  logger.silly('setting up APD versions endpoints');
  versionsEndpoints(app);
};
