const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications put');

const { updateStateAdminCertification: updateCertification } = require('../../../db/certifications');
const { updateAuthAffiliation: updateAffiliation } = require('../../../db/affiliations');
const { getAllActiveRoles: getActiveRoles } = require('../../../db/roles');

// affiliationId,
// newRoleId,
// newStatus,
// changedBy,
// stateId

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
        affiliationId,
        stateId
      } = req.body;

      try {
        
        const stateAdminCert = await updateStateAdminCertification({certificationId, affiliationId});
        console.log("stateadmincert resolution", stateAdminCert);
        const authAffiliation = await updateAuthAffiliation({
          affiliationId: Number(affiliationId),
          newRoleId: stateAdminId,
          newStatus: 'approved',
          changedBy: req.user.id,
          stateId: stateId
        });
        console.log("authAffiliation resolution", authAffiliation);
        
        if (error) {
          res.status(400).end();
        }
        res.send(200);
      } catch (e) {
        logger.error({ id: req.id, message: 'error updating state admin certification' });
        logger.error({ id: req.id, message: e });
        next({ message: 'Unable to complete state admin certification' });
      }
    }
  );
};
