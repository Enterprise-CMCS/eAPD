const defaultRoleModel = require('../../db').models.role;
const can = require('../../auth/middleware').can;

module.exports = (app, RoleModel = defaultRoleModel) => {
  app.delete('/roles/:id', can('delete-roles'), async (req, res) => {
    const targetRole = await RoleModel.where({ id: req.params.id }).fetch();
    if (!targetRole) {
      return res.status(404).end();
    }

    const userRole = await RoleModel.where({ name: req.user.role }).fetch();
    if (userRole.get('id') === targetRole.get('id')) {
      return res.status(401).end();
    }

    try {
      targetRole.activities().detach();
      await targetRole.save();
      await targetRole.destroy();
      return res.status(204).end();
    } catch (e) {
      return res.status(500).end();
    }
  });
};
