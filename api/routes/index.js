const activities = require('./activities');
const roles = require('./roles');
const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles,
  usersEndpoint = users,
  formLoggerEndopint = formLogger,
  openAPIdoc = openAPI
) => {
  activitiesEndpoint(app);
  rolesEndpoint(app);
  usersEndpoint(app);
  formLoggerEndopint(app);

  app.get('/open-api', (req, res) => {
    res.send(openAPIdoc);
  });
};
