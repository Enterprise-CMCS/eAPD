const logger = require('../../logger')('files route index');
const del = require('./delete');
const get = require('./get');
const post = require('./post');

module.exports = (
  app,
  delEndpoint = del,
  getEndpoint = get,
  postEndpoint = post
) => {
  logger.silly('setting up DELETE endpoint');
  delEndpoint(app);
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
};
