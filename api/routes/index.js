const users = require('./users');
const formLogger = require('./logForm');

module.exports = (app, usersEndpoint = users) => {
  usersEndpoint(app);
  formLogger(app);
};
