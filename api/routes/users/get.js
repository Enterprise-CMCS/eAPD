const logger = require('../../logger')('users route get');
const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  logger.debug('setting up GET /users route');
  app.get('/users', can('view-users'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling GET /users route' });
    const users = await getAllUsers();
    logger.debug({ id: req.id, message: 'sending users' });
    res.send(users);
  });

  logger.debug('setting up GET /users/:id route');
  app.get('/users/:id', can('view-users'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling GET /users/:id route' });
    logger.debug({ id: req.id, message: 'got a request for a single user', userId: req.params.id });
    const user = await getUserByID(req.params.id);

    if (user) {
      logger.debug({ id: req.id, message: 'sending user', user });
      res.send(user);
    } else {
      logger.verbose({ id: req.id, message: `no user found [${req.params.id}]`});
      res.status(404).end();
    }
  });
};
