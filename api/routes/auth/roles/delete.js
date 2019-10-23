const logger = require('../../../logger')('auth roles route delete');
const {
  deleteAuthRole: dr,
  getAuthRoleByID: gri,
  getAuthRoleByName: grn
} = require('../../../db');
const can = require('../../../middleware').can;

module.exports = (
  app,
  { deleteAuthRole = dr, getAuthRoleByID = gri, getAuthRoleByName = grn } = {}
) => {
  logger.silly('setting up DELETE /auth/roles route');
  app.delete('/auth/roles/:id', can('edit-roles'), async (req, res) => {
    logger.silly(req, 'handling up DELETE /auth/roles route');

    try {
      const targetRole = await getAuthRoleByID(req.params.id);

      if (!targetRole) {
        logger.info(
          req,
          `requested to delete a role [${req.params.id}] that does not exist`
        );
        return res.status(404).end();
      }
      logger.verbose(req, `request to delete role [${targetRole.name}]`);

      const userRole = await getAuthRoleByName(req.user.role);
      if (userRole.id === targetRole.id) {
        logger.info(
          req,
          `requested to delete a user's own role [${req.params.id}]`
        );
        return res.status(401).end();
      }

      logger.silly(req, 'removing activity associations and role');
      await deleteAuthRole(targetRole.id);

      logger.silly(req, 'okay, all good');
      return res.status(204).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
