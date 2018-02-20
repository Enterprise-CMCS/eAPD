const roles = require('./roles');
const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  rolesEndpoint = roles,
  usersEndpoint = users,
  formLoggerEndopint = formLogger,
  openAPIdoc = openAPI
) => {
  rolesEndpoint(app);
  usersEndpoint(app);
  formLoggerEndopint(app);

  app.get('/open-api', (req, res) => {
    res.send(openAPIdoc);
  });
};
