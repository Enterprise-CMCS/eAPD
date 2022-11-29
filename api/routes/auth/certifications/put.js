import { can, loggedIn } from '../../../middleware/index.js';
import loggerFactory from '../../../logger/index.js';
import { matchStateAdminCertification as matchCertification } from '../../../db/certifications.js';
import { getAllActiveRoles as getActiveRoles } from '../../../db/roles.js';

const logger = loggerFactory('auth certifications put');

export default (
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
      const stateAdminId = allRoleIds.find(
        role => role.name === 'eAPD State Admin'
      ).id;

      const { certificationId, certificationFfy, affiliationId, stateId } =
        req.body;

      try {
        const { error = null } = await matchStateAdminCertification({
          certificationId,
          affiliationId,
          stateId,
          ffy: certificationFfy,
          changedBy: req.user.id,
          newRoleId: stateAdminId,
          newStatus: 'approved'
        });

        if (error) {
          return res
            .status(400)
            .send({ message: 'Unable to complete state admin certification' })
            .end();
        }

        return res.status(200).end();
      } catch (e) {
        logger.error({
          id: req.id,
          message: 'error updating state admin certification'
        });
        logger.error({ id: req.id, message: e });
        return next({
          message: 'Unable to complete state admin certification'
        });
      }
    }
  );
};
