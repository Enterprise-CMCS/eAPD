const logger = require('../../../logger')('auth roles route index');
const get = require('./get');

module.exports = (app, getEndpoint = get) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
};
