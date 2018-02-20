const get = require('./get');
const put = require('./put');

module.exports = (app, getEndpoint = get, postEndpoint, putEndpoint = put) => {
  getEndpoint(app);
  putEndpoint(app);
};
