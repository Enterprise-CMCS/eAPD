const logger = require('../../../logger')('roles route post');
const {
  createAuthRole: cr,
  getAuthActivitiesByIDs: gai,
  getAuthRoleByName: grn
} = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (
  app,
  {
    createAuthRole = cr,
    getAuthActivitiesByIDs = gai,
    getAuthRoleByName = grn
  } = {}
) => {
  logger.silly('setting up POST /auth/roles route');
  app.post('/auth/roles', can('create-roles'), async (req, res) => {
    logger.silly(req, 'handling POST /auth/roles route');
    try {
      try {
        logger.silly(req, 'validing the request', req.body);

        if (
          !req.body.name ||
          typeof req.body.name !== 'string' ||
          req.body.length < 1
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
        logger.verbose(req, 'requested new role is invalid');
        logger.verbose(req, e.message);
        return res
          .status(400)
          .send({ error: `add-role-${e.message}` })
          .end();
      }

      logger.silly(req, 'request is valid, creating new role');

      const roleID = await createAuthRole(req.body.name, req.body.activities);

      const activities = (await getAuthActivitiesByIDs(
        req.body.activities
      )).map(({ name }) => name);

      const role = {
        id: roleID,
        name: req.body.name,
        activities
      };

      logger.silly(req, 'all done');
      return res.status(201).send(role);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
