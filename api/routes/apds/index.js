const logger = require('../../logger')('apds route index');
const get = require('./get');
const put = require('./put');
const activities = require('./activities');
const versions = require('./versions/post');

module.exports = (
  app,
  getEndpoint = get,
  putEndpoint = put,
  activitiesEndpoints = activities,
  versionsEndpoints = versions
) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);

  logger.silly('setting up APD activities endpoints');
  activitiesEndpoints(app);

  logger.silly('setting up APD versions endpoints');
  versionsEndpoints(app);
};
