const logger = require('../../../logger')('apds/submissions get');
const { getLaunchDarklyFlag } = require('../../../middleware/launchDarkly');
// const { loggedIn } = require('../../../middleware/auth');
// const { can } = require('../../../middleware');
const { getAllSubmittedAPDs: sub } = require('../../../db/apds');

module.exports = (app, { getAllSubmittedAPDs = sub } = {}) => {
  logger.silly('setting up GET /apds/submissions route');

  app.get(
    '/apds/submissions',
    // loggedIn,
    // can('foo')
    async (req, res, next) => {
      const sharepoint = await getLaunchDarklyFlag(
        'sharepoint-endpoints-4196',
        {
          key: req.user._id, // eslint-disable-line no-underscore-dangle
          ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        },
        false
      );
      if (sharepoint) {
        return res.status(403).end();
      }

      logger.silly({
        id: req.id,
        message: 'attempting to retrieve sumbitted APDs'
      });

      try {
        const submittedApds = await getAllSubmittedAPDs();
        return res.send(submittedApds);
      } catch (e) {
        logger.error({
          id: req.id,
          message: 'Error retrieving submitted APDs'
        });
        logger.error({ id: req.id, message: e });
        next({ message: 'Error retrieving submitted APDs' });
      }
      return res.status(400).end();
    }
  );
};
