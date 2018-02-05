const users = require('./users');
const formLogger = require('./logForm');

module.exports = (app, usersEndpoint = users, formLoggerEndopint = formLogger) => {
  usersEndpoint(app);
  formLoggerEndopint(app);
};
