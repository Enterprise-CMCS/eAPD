const logger = require('../../logger')('me route index');
const get = require('./get');

module.exports = (app, { getEndpoint = get } = {}) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
};
