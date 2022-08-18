const patch = require('./patch');

module.exports = (app, { patchEndpoint = patch } = {}) => {
  patchEndpoint(app);
};
