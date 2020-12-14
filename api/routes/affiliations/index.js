const get = require('./get');
const post = require('./post');
const patch = require('./patch');

module.exports = (
  app,
  { getEndpoint = get, postEndpoint = post, patchEndpoint = patch } = {}
) => {
  getEndpoint(app);
  postEndpoint(app);
  patchEndpoint(app);
};
