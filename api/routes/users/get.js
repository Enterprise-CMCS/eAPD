const logger = require('../../logger')('users route get');
const { getAllUsers: ga, getUserByID: gu } = require('../../db');
const can = require('../../middleware').can;

module.exports = (app, { getAllUsers = ga, getUserByID = gu } = {}) => {
  logger.silly('setting up GET /users route');
  app.get('/users', can('view-users'), async (req, res) => {
    logger.silly(req, 'handling GET /users route');
    try {
      const users = await getAllUsers();
      logger.silly(req, 'sending users');
      res.send(users);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
  logger.silly('setting up GET /users/:id route');
  app.get('/users/:id', can('view-users'), async (req, res) => {
    logger.silly(req, 'handling GET /users/:id route');
    logger.silly(req, 'got a request for a single user', req.params.id);
    try {
      const user = await getUserByID(req.params.id);

      if (user) {
        logger.silly(req, 'sending user', user);
        res.send(user);
      } else {
        logger.verbose(req, `no user found [${req.params.id}]`);
        res.status(404).end();
      }
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
