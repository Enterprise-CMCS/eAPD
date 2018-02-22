const logger = require('../../logger')('roles route get');
const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up GET /roles route');
  app.get('/roles', can('view-roles'), async (req, res) => {
    logger.silly('handling up GET /roles route');
    try {
      const roles = await RoleModel.fetchAll({ columns: ['id', 'name'] });
      logger.silly('getting all the activities for all the roles...');
      const sendRoles = await Promise.all(
        roles.map(async role => ({
          id: role.get('id'),
          name: role.get('name'),
          activities: await role.getActivities()
        }))
      );
      logger.silly('got all the roles');
      logger.silly(sendRoles);
      res.send(sendRoles);
    } catch (e) {
      logger.error(e);
      res.status(500).end();
    }
  });
};
