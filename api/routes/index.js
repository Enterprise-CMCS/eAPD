const users = require('./users');
const formLogger = require('./logForm');

const openapi = require('./openAPI');

module.exports = (
  app,
  usersEndpoint = users,
  formLoggerEndopint = formLogger
) => {
  usersEndpoint(app);
  formLoggerEndopint(app);

  app.get('/open-api', (req, res) => {
    res.send(openapi);
  });
};
