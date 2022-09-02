const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications get');

const {
  getStateAdminCertifications: adminCertificatons
} = require('../../../db/certifications');

module.exports = (
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
