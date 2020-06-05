const logger = require('../../../logger')('auth roles route get');
const { getActiveAuthRoles: gr } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getActiveAuthRoles = gr } = {}) => {
  logger.silly('setting up GET /auth/roles route');
  app.get('/auth/roles', can('view-roles'), async (req, res) => {
    logger.silly(req, 'handling up GET /auth/roles route');
    try {
      const roles = await getActiveAuthRoles();

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
