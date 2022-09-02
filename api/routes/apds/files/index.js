const get = require('./get');
const post = require('./post');

module.exports = (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  getEndpoint(app);
  postEndpoint(app);
};
