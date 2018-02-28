const logger = require('../../logger')('users route index');
const get = require('./get');
const post = require('./post');
const put = require('./put');

module.exports = (
  app,
  getEndpoint = get,
  postEndpoint = post,
  putEndpoint = put
) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
