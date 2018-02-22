const del = require('./delete');
const get = require('./get');
const post = require('./post');
const put = require('./put');

module.exports = (
  app,
  deleteEndpoint = del,
  getEndpoint = get,
  postEndpoint = post,
  putEndpoint = put
) => {
  deleteEndpoint(app);
  getEndpoint(app);
  postEndpoint(app);
  putEndpoint(app);
};
