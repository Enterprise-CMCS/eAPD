const logger = require('../../../logger')('apd activites route index');
const post = require('./post');
const put = require('./put');

module.exports = (app, postEndpoint = post, putEndpoint = put) => {
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
};
