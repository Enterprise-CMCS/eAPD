const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  app.get('/users', can('view-users'), (req, res, next) => {
    getAllUsers()
      .then(users => res.send(users))
      .catch(next);
  });

  app.get('/users/:id', can('view-users'), (req, res, next) => {
    getUserByID(req.params.id)
      .then(user => user ?
        res.send(user) :
        res.status(404).end()
      )
      .catch(next);
  });
};
