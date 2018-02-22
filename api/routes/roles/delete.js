const logger = require('../../logger')('roles route delete');
const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up DELETE /roles route');
  app.delete('/roles/:id', can('delete-roles'), async (req, res) => {
    logger.silly('handling up DELETE /roles route');
    const targetRole = await RoleModel.where({ id: req.params.id }).fetch();
    logger.verbose(`request to delete role [${targetRole.get('name')}]`);
    if (!targetRole) {
      logger.info(
        `requested to delete a role [${req.params.id}] that does not exist`
      );
      return res.status(404).end();
    }

    const userRole = await RoleModel.where({ name: req.user.role }).fetch();
    if (userRole.get('id') === targetRole.get('id')) {
      logger.info(`requested to delete a user's own role [${req.params.id}]`);
      return res.status(401).end();
    }

    try {
      logger.silly('removing activities');
      targetRole.activities().detach();
      await targetRole.save();
      logger.silly('destroying role');
      await targetRole.destroy();
      logger.silly('okay, all good');
      return res.status(204).end();
    } catch (e) {
      logger.error(e);
      return res.status(500).end();
    }
  });
};
