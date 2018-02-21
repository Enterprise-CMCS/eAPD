const del = require('./delete');
const get = require('./get');
const put = require('./put');

module.exports = (app, deleteEndpoint = del, getEndpoint = get, postEndpoint, putEndpoint = put) => {
  deleteEndpoint(app);
  getEndpoint(app);
  putEndpoint(app);
};
