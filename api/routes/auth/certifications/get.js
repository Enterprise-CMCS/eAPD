import { loggedIn } from '../../../middleware/auth';
import { can } from '../../../middleware';
import loggerFactory from '../../../logger';
import { getStateAdminCertifications as adminCertificatons } from '../../../db/certifications';

const logger = loggerFactory('auth certifications get');

export default (
  app,
  { getStateAdminCertifications = adminCertificatons } = {}
) => {
  logger.silly('setting up GET /auth/certifications route');

  app.get(
    '/auth/certifications',
    loggedIn,
    can('view-state-certifications'),
    async (req, res, next) => {
      try {
        const results = await getStateAdminCertifications();

        res.send(results).end();
      } catch (e) {
        logger.error({
          id: req.id,
          message: 'error fetching State Admin Certifications'
        });
        logger.error({ id: req.id, message: e });
        next(e);
      }
    }
  );
};
