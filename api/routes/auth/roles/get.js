const logger = require('../../../logger')('auth roles route get');
const defaultRoleModel = require('../../../db').models.role;
const { can } = require('../../../middleware');

module.exports = (app, RoleModel = defaultRoleModel) => {
  logger.silly('setting up GET /auth/roles route');
  app.get('/auth/roles', can('view-roles'), async (req, res) => {
    logger.silly(req, 'handling up GET /auth/roles route');
    try {
      const roles = await RoleModel.fetchAll({
        withRelated: RoleModel.withRelated
      });
      logger.silly(req, 'got all the roles');
      logger.silly(req, roles);
      res.send(roles.toJSON());
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
