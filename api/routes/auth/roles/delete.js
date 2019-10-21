const logger = require('../../../logger')('auth roles route delete');
const { knex } = require('../../../db');
const can = require('../../../middleware').can;

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up DELETE /auth/roles route');
  app.delete('/auth/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling up DELETE /auth/roles route');

    try {
      const targetRole = await db('auth_roles')
        .where('id', req.params.id)
        .select()
        .first();

      if (!targetRole) {
        logger.info(
          req,
          `requested to delete a role [${req.params.id}] that does not exist`
        );
        return res.status(404).end();
      }
      logger.verbose(req, `request to delete role [${targetRole.name}]`);

      const userRole = await db('auth_roles')
        .where('name', req.user.role)
        .select('id')
        .first();
      if (userRole.id === targetRole.id) {
        logger.info(
          req,
          `requested to delete a user's own role [${req.params.id}]`
        );
        return res.status(401).end();
      }

      logger.silly(req, 'removing activities');
      const transaction = await db.transaction();

      await transaction('auth_role_activity_mapping')
        .where('role_id', targetRole.id)
        .delete();

      logger.silly(req, 'destroying role');
      await transaction('auth_roles')
        .where('id', targetRole.id)
        .delete();

      await transaction.commit();

      logger.silly(req, 'okay, all good');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
