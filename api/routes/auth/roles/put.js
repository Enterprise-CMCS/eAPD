const logger = require('../../../logger')('roles route put');
const {
  getAuthActivitiesByIDs: gai,
  getAuthRoleByID: gri,
  getAuthRoleByName: grn,
  updateAuthRole: ur
} = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (
  app,
  {
    getAuthActivitiesByIDs = gai,
    getAuthRoleByID = gri,
    getAuthRoleByName = grn,
    updateAuthRole = ur
  } = {}
) => {
  logger.silly('setting up PUT /auth/roles/:id route');
  app.put('/auth/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling PUT /auth/roles/:id route');
    try {
      logger.silly(req, 'looking for existing role');

      const roleID = +req.params.id;

      const role = await getAuthRoleByID(roleID);
      if (!role) {
        logger.verbose(req, `no role found for [${roleID}]`);
        return res.status(404).end();
      }

      const userRole = await getAuthRoleByName(req.user.role);
      if (userRole.id === role.id) {
        logger.info(req, `requested to update user's own role [${roleID}]`);
        return res.status(403).end();
      }

      logger.silly(req, 'attempting to update role', role);

      try {
        logger.silly(req, 'validing the request', req.body);

        if (
          req.body.name &&
          (typeof req.body.name !== 'string' || req.body.length < 1)
        ) {
          logger.verbose('name is not a string or is empty');
          throw new Error('missing-name');
        }

        if (await getAuthRoleByName(req.body.name)) {
          logger.verbose('another role already has this name');
          throw new Error('duplicate-name');
        }

        logger.silly('role name is valid and unique');

        if (!Array.isArray(req.body.activities)) {
          logger.verbose('role activities is not an array');
          throw new Error('invalid-activities');
        }
        logger.silly('role activities is an array');

        if (
          req.body.activities.filter(id => typeof id !== 'number').length > 0
        ) {
          logger.verbose('role activities are not all numbers');
          throw new Error('invalid-activities');
        }
        logger.silly('all role activities are numbers');

        const validActivities = await getAuthActivitiesByIDs(
          req.body.activities
        );
        if (validActivities.length < req.body.activities.length) {
          logger.verbose('one or more activitiy IDs are invalid');
          throw new Error('invalid-activities');
        }

        logger.silly('all role activities refer to real activities');
      } catch (e) {
        logger.verbose(req, 'requested new role information is invalid');
        logger.verbose(req, e.message);
        return res
          .status(400)
          .send({ error: `edit-role-${e.message}` })
          .end();
      }

      logger.silly(req, 'request is valid');

      await updateAuthRole(roleID, req.body.name, req.body.activities);

      const activities = (await getAuthActivitiesByIDs(
        req.body.activities
      )).map(({ name }) => name);

      const updatedRole = {
        id: roleID,
        name: req.body.name || role.name,
        activities
      };

      logger.silly(req, 'all done');
      return res.send(updatedRole).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
