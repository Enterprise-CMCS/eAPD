const logger = require('../../logger')('apds route index');
const del = require('./delete');
const get = require('./get');
const post = require('./post');
const put = require('./put');
const submitted = require('./submitted/get');

module.exports = (
  app,
  {
    deleteEndpoint = del,
    getEndpoint = get,
    postEndpoint = post,
    putEndpoint = put,
    submittedEndpoints = submitted
  } = {}
) => {
  logger.silly('setting up DELETE endpoint');
  deleteEndpoint(app);
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
  logger.silly('setting up PUT endpoint');
  putEndpoint(app);

  logger.silly('setting up submitted APD endpoints');
  submittedEndpoints(app);
};
