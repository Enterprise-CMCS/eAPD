const logger = require('../../logger')('roles route post');
const defaultRoleModel = require('../../db').models.role;
const defaultActivityModel = require('../../db').models.activity;
const can = require('../../auth/middleware').can;

const validateRole = require('./validator');

module.exports = (
  app,
  RoleModel = defaultRoleModel,
  ActivityModel = defaultActivityModel
) => {
  logger.silly('setting up POST /roles route');
  app.post('/roles', can('create-roles'), async (req, res) => {
    logger.silly(req, 'handling POST /roles route');
    let roleMeta;
    try {
      logger.silly(req, 'validing the request', req.body);
      roleMeta = await validateRole(req.body, RoleModel, ActivityModel);
    } catch (e) {
      logger.verbose(req, 'requested new role is invalid');
      logger.verbose(req, e.message);
      return res
        .status(400)
        .send({ error: 'add-role-invalid' })
        .end();
    }

    logger.silly(req, 'request is valid');

    try {
      logger.silly(req, 'creating new role');
      const role = RoleModel.forge({ name: roleMeta.name });
      await role.save();

      logger.silly(req, 'attaching activities', roleMeta.activities);
      role.activities().attach(roleMeta.activities);
      await role.save();

      logger.silly(req, 'all done');
      return res.status(201).send({
        name: role.get('name'),
        id: role.get('id'),
        activities: await role.getActivities()
      });
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
