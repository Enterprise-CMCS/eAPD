import loggerFactory from '../../logger';
import { getAllActiveRoles as gr } from '../../db';
import { can } from '../../middleware';

const logger = loggerFactory('roles route get');

export default (app, { getAllActiveRoles = gr } = {}) => {
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
