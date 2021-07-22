const get = require('./get');
const post = require('./post');
const patch = require('./patch');
const del = require('./delete');

module.exports = (
  app,
  {
    getEndpoint = get,
    postEndpoint = post,
    patchEndpoint = patch,
    deleteEndpoint = del
  } = {}
) => {
  getEndpoint(app);
  postEndpoint(app);
  patchEndpoint(app);
  deleteEndpoint(app);
};
