const logger = require('../../../logger')('roles route post');
const defaultRoleModel = require('../../../db').models.role;
const { can } = require('../../../middleware');

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up POST /auth/roles route');
  app.post('/auth/roles', can('create-roles'), async (req, res) => {
    logger.silly(req, 'handling POST /auth/roles route');
    try {
      const role = RoleModel.forge({ name: req.body.name || false });

      try {
        logger.silly(req, 'validing the request', req.body);
        await role.validate({ activities: req.body.activities });
      } catch (e) {
        logger.verbose(req, 'requested new role is invalid');
        logger.verbose(req, e.message);
        return res
          .status(400)
          .send({ error: `add-role-${e.message}` })
          .end();
      }

      logger.silly(req, 'request is valid');

      logger.silly(req, 'creating new role');
      await role.save();

      logger.silly(req, 'attaching activities', req.body.activities);
      role.activities().attach(req.body.activities);
      await role.save();

      await role.load('activities');

      logger.silly(req, 'all done');
      return res.status(201).send(role.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
