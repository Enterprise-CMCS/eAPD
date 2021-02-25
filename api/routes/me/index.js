const get = require('./get');

module.exports = (app, { getEndpoint = get } = {}) => {
  getEndpoint(app);
};
