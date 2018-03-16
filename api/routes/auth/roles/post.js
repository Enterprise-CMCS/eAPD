const logger = require('../../../logger')('roles route post');
const defaultRoleModel = require('../../../db').models.role;
const defaultActivityModel = require('../../../db').models.activity;
const can = require('../../../auth/middleware').can;

const validateRole = async (role, RoleModel, ActivityModel) => {
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
    activities: role.activities
  };
};

module.exports = (
  app,
  RoleModel = defaultRoleModel,
  ActivityModel = defaultActivityModel
) => {
  logger.silly('setting up POST /auth/roles route');
  app.post('/auth/roles', can('create-roles'), async (req, res) => {
    logger.silly(req, 'handling POST /auth/roles route');
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
