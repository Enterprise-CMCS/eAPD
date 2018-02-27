const logger = require('../../logger')('users route index');
const post = require('./post');
const get = require('./get');

module.exports = (app, postEndpoint = post, getEndpoint = get) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
  logger.silly('setting up POST endpoint');
  postEndpoint(app);
};
