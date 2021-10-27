const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications put');

const { matchStateAdminCertification: matchCertification } = require('../../../db/certifications');
const { getAllActiveRoles: getActiveRoles } = require('../../../db/roles');

module.exports = (
  app,
  {
    matchStateAdminCertification = matchCertification,
    getAllActiveRoles = getActiveRoles
  } = {}
) => {
  logger.silly('setting up PUT /auth/certifications route');

  app.put(
    '/auth/certifications',
    loggedIn,
    can('edit-state-certifications'),
    async (req, res, next) => {
      
      const allRoleIds = await getAllActiveRoles();
      const stateAdminId = allRoleIds.find(role => role.name === 'eAPD State Admin').id;
      
      const {
        certificationId,
        certificationFfy,
        affiliationId,
        stateId
      } = req.body;
      
      try {
        await matchStateAdminCertification({
          certificationId: Number(certificationId),
          affiliationId: Number(affiliationId),
          changedBy: req.user.id,
          newRoleId: stateAdminId,
          newStatus: 'approved',
          stateId,
          ffy: certificationFfy
        });
        
        res.send(200);        
      } catch (e) {
        logger.error({ id: req.id, message: 'error updating state admin certification' });
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to complete state admin certification' });
      }
    }
  );
};
