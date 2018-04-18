const logger = require('../../logger')('users route get');
const defaultUserModel = require('../../db').models.user;
const can = require('../../middleware').can;

const allUsersHandler = async (req, res, UserModel) => {
  logger.silly(req, 'handling GET /users route');
  try {
    const users = await UserModel.fetchAll({
      columns: ['id', 'email', 'state_id']
    });
    logger.silly(req, 'sending users', users.toJSON());
    res.send(users);
  } catch (e) {
    logger.error(req, e);
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, UserModel) => {
  logger.silly(req, 'handling GET /users/:id route');
  logger.silly(req, 'got a request for a single user', req.params.id);
  try {
    const user = await UserModel.where({ id: Number(req.params.id) }).fetch();
    if (user) {
      logger.silly(req, 'sending user', user.toJSON());
      res.send(user);
    } else {
      logger.verbose(req, `no user found [${req.params.id}]`);
      res.status(404).end();
    }
  } catch (e) {
    logger.error(req, e);
    res.status(500).end();
  }
};

module.exports = (app, UserModel = defaultUserModel) => {
  logger.silly('setting up GET /users route');
  app.get('/users', can('view-users'), (req, res) =>
    allUsersHandler(req, res, UserModel)
  );
  logger.silly('setting up GET /users/:id route');
  app.get('/users/:id', can('view-users'), (req, res) =>
    oneUserHandler(req, res, UserModel)
  );
};
