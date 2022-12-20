const { getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getUserByID = gu } = {}) => {
  app.get('/users/:id', can('view-users'), async (req, res, next) => {
    await getUserByID(req.params.id, true, {})
      .then(user => (user ? res.json(user) : res.status(404).end()))
      .catch(next);
  });
};
