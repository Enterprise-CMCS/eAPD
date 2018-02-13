const post = require('./post');
const get = require('./get');
const put = require('./put');

module.exports = (app, getEndpoint = get, postEndpoint = post, putEndpoint = put) => {
  getEndpoint(app);
  // postEndpoint(app);
  // putEndpoint(app);
};
