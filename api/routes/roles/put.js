const logger = require('../../logger')('roles route put');
const defaultRoleModel = require('../../db').models.role;
const defaultActivityModel = require('../../db').models.activity;
const can = require('../../auth/middleware').can;

const validateRole = require('./validator');

module.exports = (
  app,
  RoleModel = defaultRoleModel,
  ActivityModel = defaultActivityModel
) => {
  logger.silly('setting up PUT /roles route');
  app.put('/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling PUT /roles route');
    logger.silly(req, 'looking for existing role');
    const role = await RoleModel.where({ id: req.params.id }).fetch();
    if (!role) {
      logger.verbose(req, `no role found for [${req.params.id}]`);
      return res.status(404).end();
    }

    logger.silly(
      req,
      'attempting to update role',
      JSON.parse(JSON.stringify(role))
    );

    let roleMeta;
    try {
      logger.silly(req, 'validing the request', req.body);
      roleMeta = await validateRole(req.body, null, ActivityModel);
    } catch (e) {
      logger.verbose(req, 'requested new role information is invalid');
      logger.verbose(req, e.message);
      return res
        .status(400)
        .send({ error: 'edit-role-invalid' })
        .end();
    }

    logger.silly(req, 'request is valid');

    try {
      logger.silly(req, 'removing previous activities');
      role.activities().detach();
      await role.save();

      logger.silly(req, 'adding new activities', roleMeta.activities);
      role.activities().attach(roleMeta.activities);
      await role.save();

      logger.silly(req, 'all done');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
