import { getAllUsers as ga, getUserByID as gu } from '../../db/index.js';
import { can } from '../../middleware/index.js';

export default (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
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
