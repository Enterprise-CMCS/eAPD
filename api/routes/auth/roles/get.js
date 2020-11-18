const logger = require('../../../logger')('auth roles route get');
const { getActiveAuthRoles: gr } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getActiveAuthRoles = gr } = {}) => {
  logger.debug('setting up GET /auth/roles route');
  app.get('/auth/roles', can('view-roles'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling up GET /auth/roles route' });
    const roles = await getActiveAuthRoles();

    logger.debug({
      id: req.id,
      message: `got all the roles: ${roles.map(({ name }) => name).join(', ')}`
    });
    res.send(roles);
  });
};
