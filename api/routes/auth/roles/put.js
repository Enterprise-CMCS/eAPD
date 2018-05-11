const logger = require('../../../logger')('roles route put');
const defaultRoleModel = require('../../../db').models.role;
const { can } = require('../../../middleware');

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up PUT /auth/roles/:id route');
  app.put('/auth/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling PUT /auth/roles/:id route');
    try {
      logger.silly(req, 'looking for existing role');
      const role = await RoleModel.where({ id: req.params.id }).fetch();
      if (!role) {
        logger.verbose(req, `no role found for [${req.params.id}]`);
        return res.status(404).end();
      }

      const userRole = await RoleModel.where({
        id: req.params.id,
        name: req.user.role
      }).fetch();
      if (userRole) {
        logger.verbose(req, `attempting to update own role [${req.params.id}]`);
        return res.status(403).end();
      }

      logger.silly(req, 'attempting to update role', role.toJSON());

      try {
        logger.silly(req, 'validing the request', req.body);
        await role.validate({ activities: req.body.activities });
      } catch (e) {
        logger.verbose(req, 'requested new role information is invalid');
        logger.verbose(req, e.message);
        return res
          .status(400)
          .send({ error: `edit-role-${e.message}` })
          .end();
      }

      logger.silly(req, 'request is valid');

      if (req.body.name) {
        role.set({ name: req.body.name });
      }

      logger.silly(req, 'removing previous activities');
      role.activities().detach();
      await role.save();

      logger.silly(req, 'adding new activities', req.body.activities);
      role.activities().attach(req.body.activities);
      await role.save();

      const updated = await RoleModel.where({ id: req.params.id }).fetch({
        withRelated: RoleModel.withRelated
      });

      logger.silly(req, 'all done');
      return res.send(updated.toJSON()).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
