const logger = require('../../logger')('roles route get');
const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up GET /roles route');
  app.get('/roles', can('view-roles'), async (req, res) => {
    logger.silly(req, 'handling up GET /roles route');
    try {
      const roles = await RoleModel.fetchAll({ columns: ['id', 'name'] });
      logger.silly(req, 'getting all the activities for all the roles...');
      const sendRoles = await Promise.all(
        roles.map(async role => ({
          id: role.get('id'),
          name: role.get('name'),
          activities: await role.getActivities()
        }))
      );
      logger.silly(req, 'got all the roles');
      logger.silly(req, sendRoles);
      res.send(sendRoles);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
