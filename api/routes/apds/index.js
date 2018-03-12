const logger = require('../../logger')('apds route index');
const get = require('./get');

module.exports = (app, getEndpoint = get) => {
  logger.silly('setting up GET endpoint');
  getEndpoint(app);
};
