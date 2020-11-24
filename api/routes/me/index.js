const get = require('./get');
const patch = require('./patch');

module.exports = (app, { getEndpoint = get, patchEndpoint = patch } = {}) => {
  getEndpoint(app);
  patchEndpoint(app);
};
