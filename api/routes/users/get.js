const logger = require('../../logger')('users route get');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

const allUsersHandler = async (req, res, UserModel) => {
  logger.silly(req, 'handling GET /users route');
  try {
    const users = await UserModel.fetchAll({ columns: ['id', 'email'] });
    logger.silly(req, 'sending users', JSON.parse(JSON.stringify(users)));
    res.send(
      users.map(user => ({ email: user.get('email'), id: user.get('id') }))
    );
  } catch (e) {
    logger.error(req, e);
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, UserModel) => {
  logger.silly(req, 'handling GET /user/:id route');
  if (req.params.id && !Number.isNaN(Number(req.params.id))) {
    logger.silly(req, 'got a request for a single user', req.params.id);
    try {
      const user = await UserModel.where({ id: Number(req.params.id) }).fetch({
        columns: ['id', 'email', 'name', 'position', 'phone', 'state']
      });
      if (user) {
        const userObj = JSON.parse(JSON.stringify(user));
        logger.silly(req, 'sending user', userObj);
        res.send(userObj);
      } else {
        logger.verbose(req, `no user found [${req.params.id}]`);
        res.status(404).end();
      }
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  } else {
    logger.verbose(req, `invalid request: [${req.params.id}]`);
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
