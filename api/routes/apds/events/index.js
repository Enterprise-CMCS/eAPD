const logger = require('../../../logger')('apds/events route index');
const post = require('./post');

module.exports = (app, { postEndpoint = post } = {}) => {
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
};
