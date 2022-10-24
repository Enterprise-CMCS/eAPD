const logger = require('../../../logger')('apds/submissions get');
const { getLaunchDarklyFlag } = require('../../../middleware/launchDarkly');
const { updateAPDReviewStatus: urs } = require('../../../db/apds');

module.exports = (app, { updateAPDReviewStatus = urs } = {}) => {
  logger.silly('setting up PATCH /apds/submissions route');

  app.patch('/apds/submissions', async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.ip || '';
    ip = ip.toString().replace('::ffff:', '');
    const sharepoint = await getLaunchDarklyFlag(
      'sharepoint-endpoints-4196',
      {
        key: 'API User',
        ip
      },
      false
    );
    if (!sharepoint) {
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
  });
};
