const logger = require('../../../logger')('apds/submissions get');
const { getLaunchDarklyFlag } = require('../../../middleware/launchDarkly');
// const { loggedIn } = require('../../../middleware/auth');
// const { can } = require('../../../middleware');
const { updateAPDReviewStatus: urs } = require('../../../db/apds');

module.exports = (app, { updateAPDReviewStatus = urs } = {}) => {
  logger.silly('setting up PATCH /apds/submissions route');

  app.patch(
    '/apds/submissions',
    // loggedIn,
    // can('foo')
    async (req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log({ ip });
      const sharepoint = await getLaunchDarklyFlag(
        'sharepoint-endpoints-4196',
        {
          key: req.user._id, // eslint-disable-line no-underscore-dangle
          ip
        },
        false
      );
      if (sharepoint) {
        return res.status(403).end();
      }

      if (!Array.isArray(req.body)) {
        logger.error({ id: req.id, message: 'request body must be an array' });
        return res.status(400).end();
      }

      try {
        await updateAPDReviewStatus(req.body);
      } catch (e) {
        logger.error({ id: req.id, message: 'change me' });
        logger.error({ id: req.id, message: e });
        next({ message: 'change me' });
      }
      return res.status(204).end();
    }
  );
};
