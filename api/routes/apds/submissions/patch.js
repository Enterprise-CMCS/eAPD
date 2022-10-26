const logger = require('../../../logger')('apds/submissions get');
const {
  getLaunchDarklyFlag: flag
} = require('../../../middleware/launchDarkly');
const { updateAPDReviewStatus: urs } = require('../../../db/apds');

module.exports = (
  app,
  { updateAPDReviewStatus = urs, getLaunchDarklyFlag = flag } = {}
) => {
  logger.silly('setting up PATCH /apds/submissions route');

  app.patch('/apds/submissions', async (req, res, next) => {
    let ip = req?.headers?.['x-forwarded-for'] || req?.ip || '';
    ip = ip.toString().replace('::ffff:', '');
    const sharepoint = await getLaunchDarklyFlag(
      'sharepoint-endpoints-4196',
      {
        key: 'anonymous',
        anonymous: true,
        ip
      },
      false
    );
    if (sharepoint !== true) {
      return res.status(403).end();
    }

    if (!Array.isArray(req.body)) {
      logger.error({ id: req.id, message: 'request body must be an array' });
      return res.status(400).end();
    }

    logger.silly({
      id: req.id,
      message: 'attempting to update APDs'
    });

    try {
      await updateAPDReviewStatus(req.body);
    } catch (e) {
      logger.error({ id: req.id, message: 'Error updating APDs' });
      logger.error({ id: req.id, message: e });
      next({ message: 'Error updating APDs' });
    }
    return res.status(204).end();
  });
};
