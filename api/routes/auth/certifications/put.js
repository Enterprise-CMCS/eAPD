const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications put');

const { updateStateAdminCertification: updateCertification } = require('../../../db/certifications');
const { updateAuthAffiliation: updateAffiliation } = require('../../../db/affiliations');
const { getAllActiveRoles: getActiveRoles } = require('../../../db/roles');

module.exports = (
  app,
  {
    updateStateAdminCertification = updateCertification,
    updateAuthAffiliation = updateAffiliation,
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
        await updateStateAdminCertification({
          certificationId: certificationId,
          affiliationId: affiliationId,
          changedBy: req.user.id
        });
        
        await updateAuthAffiliation({
          affiliationId: Number(affiliationId),
          newRoleId: stateAdminId,
          newStatus: 'approved',
          changedBy: req.user.id,
          stateId: stateId,
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
