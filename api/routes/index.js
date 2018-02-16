const roles = require('./roles');
const users = require('./users');
const formLogger = require('./logForm');

module.exports = (
  app,
  rolesEndpoint = roles,
  usersEndpoint = users,
  formLoggerEndopint = formLogger
) => {
  rolesEndpoint(app);
  usersEndpoint(app);
  formLoggerEndopint(app);
};
