import { loggedIn } from '../../../middleware/auth';
import { can } from '../../../middleware';
import loggerFactory from '../../../logger';
import { addStateAdminCertification as addCert } from '../../../db/certifications';

const logger = loggerFactory('auth certifications post');

export default (app, { addStateAdminCertification = addCert } = {}) => {
  logger.silly('setting up POST /auth/certifications route');

  app.post(
    '/auth/certifications',
    loggedIn,
    can('edit-state-certifications'),
    async (req, res, next) => {
      const { ffy, name, email, state, fileUrl } = req.body;

      try {
        const { error = null } = await addStateAdminCertification({
          ffy,
          name,
          email,
          state,
          fileUrl,
          uploadedBy: req.user.id,
          uploadedOn: new Date(),
          status: 'active'
        });
        if (error) {
          return res.status(400).end();
        }
        return res.status(200).end();
      } catch (e) {
        logger.error({
          id: req.id,
          message: 'error adding new state admin certification'
        });
        logger.error({ id: req.id, message: e });
        return next({ message: 'Unable to save state admin certification' });
      }
    }
  );
};
