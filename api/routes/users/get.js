const logger = require('../../logger')('users route get');
const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  logger.silly('setting up GET /users route');
  app.get('/users', can('view-users'), async (req, res) => {
    logger.silly({ id: req.id, message: 'handling GET /users route' });
    try {
      const users = await getAllUsers();
      logger.silly({ id: req.id, message: 'sending users' });
      res.send(users);
    } catch (e) {
      logger.error({ id: req.id, message: e });
      res.status(500).end();
    }
  });
  logger.silly('setting up GET /users/:id route');
  app.get('/users/:id', can('view-users'), async (req, res) => {
    logger.silly({ id: req.id, message: 'handling GET /users/:id route' });
    logger.silly({ id: req.id, message: 'got a request for a single user', userId: req.params.id });
    try {
      const user = await getUserByID(req.params.id);

      if (user) {
        logger.silly({ id: req.id, message: 'sending user', user: user });
        res.send(user);
      } else {
        logger.verbose({ id: req.id, message: `no user found [${req.params.id}]`});
        res.status(404).end();
      }
    } catch (e) {
      logger.error({ id: req.id, message: e });
      res.status(500).end();
    }
  });
};
