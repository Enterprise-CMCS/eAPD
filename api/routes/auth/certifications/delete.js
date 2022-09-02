const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications delete');

const {
  archiveStateAdminCertification: archiveCertification
} = require('../../../db/certifications');

module.exports = (
  app,
  { archiveStateAdminCertification = archiveCertification } = {}
) => {
  logger.silly('setting up DELETE /auth/certifications route');

  app.delete(
    '/auth/certifications',
    loggedIn,
    can('edit-state-certifications'),
    async (req, res, next) => {
      try {
        const { error = null } = await archiveStateAdminCertification({
          id: req.body.certificationId,
          archived_by: req.user.id
        });
        if (error) {
          res.send(400, `error deleting certification: ${error}`);
        }
        res.send(200);
      } catch (e) {
        logger.error({
          id: req.id,
          message: 'error deleting/archiving State Admin Certification'
        });
        logger.error({ id: req.id, message: e });
        next(e);
      }
    }
  );
};
