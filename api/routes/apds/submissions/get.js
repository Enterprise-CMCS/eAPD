const logger = require('../../../logger')('apds/submissions get');
const { getLaunchDarklyFlag } = require('../../../middleware/launchDarkly');
const { getAllSubmittedAPDs: sub } = require('../../../db/apds');

module.exports = (app, { getAllSubmittedAPDs = sub } = {}) => {
  logger.silly('setting up GET /apds/submissions route');

  app.get('/apds/submissions', async (req, res, next) => {
    let ip = req?.headers?.['x-forwarded-for'] || req?.ip || '';
    ip = ip.toString().replace('::ffff:', '');
    console.log(`headers ${req?.headers?.['x-forwarded-for']}`);
    console.log(`req.ip ${req?.ip}`);
    console.log({ ip });
    const sharepoint = await getLaunchDarklyFlag(
      'sharepoint-endpoints-4196',
      {
        key: 'anonymous',
        ip
      },
      false
    );
    console.log({ sharepoint });
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
