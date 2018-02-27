const logger = require('../../logger')('users route index');
const post = require('./post');
const put = require('./put');
const get = require('./get');

module.exports = (
  app,
  postEndpoint = post,
  getEndpoint = get,
  putEndpoint = put
) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
