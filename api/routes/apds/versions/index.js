const del = require('./delete');
const post = require('./post');

module.exports = (app, { delEndpoint = del, postEndpoint = post } = {}) => {
  delEndpoint(app);
  postEndpoint(app);
};
