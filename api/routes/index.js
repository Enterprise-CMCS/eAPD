const users = require('./users');
const formLogger = require('./logForm');
const openAPI = require('./openAPI');

module.exports = (
  app,
  usersEndpoint = users,
  formLoggerEndopint = formLogger,
  openAPIdoc = openAPI
) => {
  usersEndpoint(app);
  formLoggerEndopint(app);

  app.get('/open-api', (req, res) => {
    res.send(openAPIdoc);
  });
};
