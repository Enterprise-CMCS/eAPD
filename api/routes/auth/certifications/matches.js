const { loggedIn } = require('../../../middleware/auth');
const { can } = require('../../../middleware');
const logger = require('../../../logger')('auth certifications post');

module.exports = (
  app,
  {
    // Inject dependencies here
  } = {}
) => {
  logger.silly('setting up GET /auth/certifications/matches/:status? route');

  app.get(
    '/auth/certifications/matches/:status?',
    loggedIn,
    can('view-state-certifications'),
    async (req, res, next) => {
      try {
        res.send({success: true, status:req.params.status})
      } catch (e) {
        logger.error({ id: req.id, message: 'something went wrong' });
        logger.error({ id: req.id, message: e });
        next(e);
      }
    }
  );
}
