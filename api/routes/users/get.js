const logger = require('../../logger')('users route get');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

const allUsersHandler = async (req, res, UserModel) => {
  logger.silly('handling GET /users route');
  try {
    const users = await UserModel.fetchAll({ columns: ['id', 'email'] });
    logger.silly('sending users', JSON.parse(JSON.stringify(users)));
    res.send(
      users.map(user => ({ email: user.get('email'), id: user.get('id') }))
    );
  } catch (e) {
    logger.error(e);
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, UserModel) => {
  logger.silly('handling GET /user/:id route');
  if (req.params.id && !Number.isNaN(Number(req.params.id))) {
    logger.silly('got a request for a single user', req.params.id);
    try {
      const user = await UserModel.where({ id: Number(req.params.id) }).fetch({
        columns: ['id', 'email']
      });
      if (user) {
        logger.silly('sending user', JSON.parse(JSON.stringify(user)));
        res.send({ email: user.get('email'), id: user.get('id') });
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
  logger.silly('setting up GET /users route');
  app.get('/users', can('view-users'), (req, res) =>
    allUsersHandler(req, res, UserModel)
  );
  logger.silly('setting up GET /user/:id route');
  app.get('/user/:id', can('view-users'), (req, res) =>
    oneUserHandler(req, res, UserModel)
  );
};
