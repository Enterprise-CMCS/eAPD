const logger = require('../../logger')('states route index');
const put = require('./put');

module.exports = (app, putEndpoint = put) => {
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
