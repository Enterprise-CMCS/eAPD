const logger = require('../../logger')('states route index');
const get = require('./get');
const put = require('./put');

module.exports = (app, getEndpoint = get, putEndpoint = put) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
