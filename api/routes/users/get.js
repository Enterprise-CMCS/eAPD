const logger = require('../../logger')('users route get');
const { knex } = require('../../db');
const can = require('../../middleware').can;

const sendableUser = user => ({
  id: user.id,
  email: user.email,
  name: user.name,
  position: user.position,
  phone: user.phone,
  state: user.state_id,
  role: user.auth_role
});

const allUsersHandler = async (req, res, db) => {
  logger.silly(req, 'handling GET /users route');
  try {
    const users = (await db('users').select()).map(sendableUser);
    logger.silly(
      req,
      'sending users',
      users.map(
        ({ id, email, name, state, role }) =>
          `id: ${id}, email: ${email}, name: ${name}, state: ${state}, auth role: ${role}`
      )
    );
    res.send(users);
  } catch (e) {
    logger.error(req, e);
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, db) => {
  logger.silly(req, 'handling GET /users/:id route');
  logger.silly(req, 'got a request for a single user', req.params.id);
  try {
    const user = await db('users')
      .where({ id: Number(req.params.id) })
      .first();

    if (user) {
      logger.silly(req, 'sending user', sendableUser(user));
      res.send(sendableUser(user));
    } else {
      logger.verbose(req, `no user found [${req.params.id}]`);
      res.status(404).end();
    }
  } catch (e) {
    logger.error(req, e);
    res.status(500).end();
  }
};

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up GET /users route');
  app.get('/users', can('view-users'), (req, res) =>
    allUsersHandler(req, res, db)
  );
  logger.silly('setting up GET /users/:id route');
  app.get('/users/:id', can('view-users'), (req, res) =>
    oneUserHandler(req, res, db)
  );
};
