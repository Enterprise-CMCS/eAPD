const logger = require('../../../logger')('apds/submissions get');
const {
  getLaunchDarklyFlag: flag
} = require('../../../middleware/launchDarkly');
const { getAllSubmittedAPDs: sub } = require('../../../db/apds');

module.exports = (
  app,
  { getAllSubmittedAPDs = sub, getLaunchDarklyFlag = flag } = {}
) => {
  logger.silly('setting up GET /apds/submissions route');

  app.get('/apds/submissions', async (req, res, next) => {
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

    logger.silly({
      id: req.id,
      message: 'attempting to retrieve sumbitted APDs'
    });

    let submittedApds = [];
    try {
      submittedApds = await getAllSubmittedAPDs();
    } catch (e) {
      logger.error({
        id: req.id,
        message: 'Error retrieving submitted APDs'
      });
      logger.error({ id: req.id, message: e });
      next({ message: 'Error retrieving submitted APDs' });
    }
    return res.send(submittedApds);
  });
};
