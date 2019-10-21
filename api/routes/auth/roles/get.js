const logger = require('../../../logger')('auth roles route get');
const { knex } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up GET /auth/roles route');
  app.get('/auth/roles', can('view-roles'), async (req, res) => {
    logger.silly(req, 'handling up GET /auth/roles route');
    try {
      const roles = await db('auth_roles').select();
      await Promise.all(
        roles.map(async role => {
          const activityIDs = (await db('auth_role_activity_mapping')
            .where('role_id', role.id)
            // eslint-disable-next-line camelcase
            .select('activity_id')).map(({ activity_id }) => activity_id);

          const activities = (await db('auth_activities')
            .whereIn('id', activityIDs)
            .select('name')).map(({ name }) => name);

          // eslint-disable-next-line no-param-reassign
          role.activities = activities;
        })
      );

      logger.silly(
        req,
        `got all the roles: ${roles.map(({ name }) => name).join(', ')}`
      );
      res.send(roles);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
