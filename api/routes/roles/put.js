const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  app.put('/roles', can('edit-roles'), async (req, res) => {
    res.status(501).end();
  });
};
