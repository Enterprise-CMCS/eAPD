const post = require('./post');
const get = require('./get');

module.exports = (app, postEndpoint = post, getEndpoint = get) => {
  postEndpoint(app);
  getEndpoint(app);
};
