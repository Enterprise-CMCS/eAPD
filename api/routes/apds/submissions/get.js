import loggerFactory from '../../../logger/index.js';
import { getAllSubmittedAPDs as sub } from '../../../db/apds.js';

const logger = loggerFactory('apds/submissions get');

export default (app, { getAllSubmittedAPDs = sub } = {}) => {
  logger.silly('setting up GET /apds/submissions route');

  app.get('/apds/submissions', async (req, res, next) => {
    if (!req?.headers?.apikey) {
      return res.status(403).end();
    }

    logger.silly({
      id: req.id,
      message: 'attempting to retrieve sumbitted APDs'
    });

    let submittedApds = [];
    try {
      submittedApds = await getAllSubmittedAPDs();
      return res.send(submittedApds);
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
