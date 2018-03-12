const logger = require('../../logger')('users route index');
const del = require('./delete');
const get = require('./get');
const post = require('./post');
const put = require('./put');

module.exports = (
  app,
  deleteEndpoint = del,
  getEndpoint = get,
  postEndpoint = post,
  putEndpoint = put
) => {
  logger.silly('setting up DELETE endpoint');
  deleteEndpoint(app);
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
