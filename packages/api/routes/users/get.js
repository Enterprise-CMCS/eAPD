const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  app.get('/users', can('view-users'), async (req, res, next) => {
    await getAllUsers()
      .then(users => res.json(users))
      .catch(next);
  });

  app.get('/users/:id', can('view-users'), async (req, res, next) => {
    await getUserByID(req.params.id, true, {})
      .then(user => (user ? res.json(user) : res.status(404).end()))
      .catch(next);
  });
};
