const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  app.get('/roles', can('view-roles'), async (req, res) => {
    try {
      const roles = await RoleModel.fetchAll({ columns: ['id', 'name'] });
      const sendRoles = await Promise.all(roles.map(async role => ({
        id: role.get('id'),
        name: role.get('name'),
        activities: await role.getActivities()
      })));
      res.send(sendRoles);
    } catch (e) {
      res.status(500).end();
    }
  });
};
