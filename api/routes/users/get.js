const logger = require('../../logger')('GET /users');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

const allUsersHandler = async (req, res, UserModel) => {
  logger.silly('got request for all users');
  try {
    const users = await UserModel.fetchAll({ columns: ['id', 'email'] });
    logger.verbose(`sending users [${users.length} items]`);
    res.send(users);
  } catch (e) {
    logger.error(e);
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, UserModel) => {
  if (req.params.id && !Number.isNaN(Number(req.params.id))) {
    logger.silly('got a request for a single user', req.params.id);
    try {
      const user = await UserModel.where({ id: Number(req.params.id) }).fetch({
        columns: ['id', 'email']
      });
      if (user) {
        logger.verbose(`sending user [${user.get('email')}]`);
        res.send(user);
      } else {
        logger.verbose(`no user found [${req.params.id}]`);
        res.status(404).end();
      }
    } catch (e) {
      logger.error(e);
      res.status(500).end();
    }
  } else {
    logger.verbose(`invalid request: [${req.params.id}]`);
    res
      .status(400)
      .send({ error: 'get-user-invalid' })
      .end();
  }
};

module.exports = (app, UserModel = defaultUserModel) => {
  logger.silly('adding route for GET /users');
  app.get('/users', can('view-users'), (req, res) =>
    allUsersHandler(req, res, UserModel)
  );
  logger.silly('adding route for GET /user/:id');
  app.get('/user/:id', can('view-users'), (req, res) =>
    oneUserHandler(req, res, UserModel)
  );
};
