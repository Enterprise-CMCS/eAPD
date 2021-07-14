const logger = require('../../logger')('roles route get');
const { getAllActiveRoles: gr } = require('../../db');
const { can } = require('../../middleware');

// This will be updated to only return roles that the user is able to assign
module.exports = (app, { getAllActiveRoles = gr } = {}) => {
  app.get('/roles', can('view-roles'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling GET /roles' });

    try {
      const roles = await getAllActiveRoles(req.user.role);
      return res.status(200).send(roles);
    } catch (e) {
      return next(e);
    }
  });
};
