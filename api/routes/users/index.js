const post = require('./post');

module.exports = (app, postEndpoint = post) => {
  postEndpoint(app);
};
