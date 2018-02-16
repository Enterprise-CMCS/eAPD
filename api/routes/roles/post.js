const defaultRoleModel = require('../../db').models.role;
const defaultActivityModel = require('../../db').models.activity;
const can = require('../../auth/middleware').can;

const validateRole = async (role, RoleModel, ActivityModel) => {
  if (!role) {
    throw new Error('Role must be specified');
  }
  if (!role.name) {
    throw new Error('Role must have a name');
  }
  if (await RoleModel.where({ name: role.name }).fetch()) {
    throw new Error(`Role name "${role.name}" already exists`);
  }
  if (!Array.isArray(role.activities)) {
    throw new Error('Role must have a list of activities');
  }
  if (role.activities.filter(id => typeof id !== 'number').length > 0) {
    throw new Error('Role activites must be numbers');
  }

  const validActivities = await ActivityModel.where(
    'id',
    'in',
    role.activities
  ).fetchAll({ columns: ['id'] });
  const validIDs = validActivities.map(activity => activity.get('id'));
  const invalidIDs = role.activities.filter(
    roleID => !validIDs.includes(roleID)
  );

  if (invalidIDs.length) {
    throw new Error(
      `Activity IDs ${JSON.stringify(invalidIDs).replace(
        /\[(.+)\]/,
        '$1'
      )} are invalid`
    );
  }

  return {
    name: role.name,
    activities: role.activities.filter(id => !Number.isNaN(Number(id)))
  };
};

module.exports = (
  app,
  RoleModel = defaultRoleModel,
  ActivityModel = defaultActivityModel
) => {
  app.post('/roles', can('create-roles'), async (req, res) => {
    let roleMeta;
    try {
      roleMeta = await validateRole(req.body, RoleModel, ActivityModel);
    } catch (e) {
      return res
        .status(400)
        .send({ error: 'add-role-invalid' })
        .end();
    }

    try {
      const role = RoleModel.forge({ name: roleMeta.name });
      await role.save();
      role.activities().attach(roleMeta.activities);
      await role.save();
      return res.send({ roleID: role.get('id') });
    } catch (e) {
      return res.status(500).end();
    }
  });
};
