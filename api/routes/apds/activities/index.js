const logger = require('../../../logger')('apd activites route index');
const post = require('./post');
const put = require('./put');
const goals = require('./goals/put');
const approaches = require('./approaches/put');

module.exports = (
  app,
  postEndpoint = post,
  putEndpoint = put,
  approachesEndpoint = approaches,
  goalsEndpoints = goals
) => {
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);
  logger.silly('setting up approaches endpoints');
  approachesEndpoint(app);
  logger.silly('setting up goals endpoints');
  goalsEndpoints(app);
};
