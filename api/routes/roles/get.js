const logger = require('../../logger')('roles route get');
const { getAllActiveRoles: gr } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app, { getAllActiveRoles = gr } = {}) => {
  const accessibleRoles = {
    'eAPD System Admin': null,
    'eAPD Federal Admin': ['eAPD Federal Admin', 'eAPD State Admin'],
    'eAPD State Admin': ['eAPD State Staff', 'eAPD State Contractor']
  };
  app.get('/roles', can('view-roles'), async (req, res, next) => {
    logger.silly({ id: req.id, message: 'handling GET /roles' });

    try {
      const roles = await getAllActiveRoles(accessibleRoles[req.user.role]);
      return res.status(200).send(roles);
    } catch (e) {
      return next(e);
    }
  });
};
