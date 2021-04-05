const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;
const { ERROR_MESSAGES } = require('../openAPI/helpers');

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  app.get('/users', can('view-users'), async (req, res, next) => {
    await getAllUsers()
      .then(users => res.send(users))
      .catch(next);
  });

  app.get('/users/:id', can('view-users'), async (req, res, next) => {
    await getUserByID(req.params.id)
      .then(user =>
        user
          ? res.send(user)
          : res
              .status(400)
              .send({ error: ERROR_MESSAGES[400] })
              .end()
      )
      .catch(next);
  });
};
