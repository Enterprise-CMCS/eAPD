const logger = require('../../../logger')('roles route put');
const { knex } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up PUT /auth/roles/:id route');
  app.put('/auth/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling PUT /auth/roles/:id route');
    try {
      logger.silly(req, 'looking for existing role');

      const roleID = +req.params.id;

      const role = await db('auth_roles')
        .where('id', roleID)
        .first();
      if (!role) {
        logger.verbose(req, `no role found for [${roleID}]`);
        return res.status(404).end();
      }

      const userRole = await db('auth_roles')
        .where('name', req.user.role)
        .select('id')
        .first();
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

        if (
          await db('auth_roles')
            .where('name', req.body.name)
            .first()
        ) {
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

        const validActivities = await db('auth_activities')
          .whereIn('id', req.body.activities)
          .select();
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

      const transaction = await db.transaction();
      if (req.body.name) {
        await transaction('auth_roles')
          .where('id', roleID)
          .update({ name: req.body.name });
      }

      logger.silly(req, 'removing previous activities');
      await transaction('auth_role_activity_mapping')
        .where('role_id', role.id)
        .delete();

      logger.silly(req, 'adding new activities', req.body.activities);
      await transaction('auth_role_activity_mapping').insert(
        req.body.activities.map(activity => ({
          role_id: role.id,
          activity_id: activity
        }))
      );

      await transaction.commit();

      const activities = (await db('auth_activities')
        .whereIn('id', req.body.activities)
        .select('name')).map(({ name }) => name);

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
