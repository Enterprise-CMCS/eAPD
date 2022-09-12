const logger = require('../../logger')('apds route index');
const del = require('./delete');
const get = require('./get');
const patch = require('./patch');
const post = require('./post');
const files = require('./files');
const events = require('./events');
const budget = require('./budget');

module.exports = (
  app,
  {
    filesEndpoints = files,
    eventsEndpoints = events,
    budgetEndpoints = budget,
    deleteEndpoint = del,
    getEndpoint = get,
    patchEndpoint = patch,
    postEndpoint = post
  } = {}
) => {
  logger.debug('setting up APD image endpoints');
  filesEndpoints(app);

  logger.debug('setting up APD events endpoints');
  eventsEndpoints(app);

  logger.debug('setting up APD budget endpoints');
  budgetEndpoints(app);

  logger.debug('setting up DELETE endpoint');
  deleteEndpoint(app);
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
  logger.debug('setting up PATCH endpoint');
  patchEndpoint(app);
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
};
