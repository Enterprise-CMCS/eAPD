const users = require('./users');

module.exports = (app, usersEndpoint = users) => {
  usersEndpoint(app);
};
