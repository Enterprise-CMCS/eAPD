const logger = require('../../logger')('apds route index');
const del = require('./delete');
const get = require('./get');
const patch = require('./patch');
const post = require('./post');

module.exports = (
  app,
  {
    deleteEndpoint = del,
    getEndpoint = get,
    patchEndpoint = patch,
    postEndpoint = post,
  } = {}
) => {
  logger.silly('setting up DELETE endpoint');
  deleteEndpoint(app);
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up PATCH endpoint');
  patchEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
};
