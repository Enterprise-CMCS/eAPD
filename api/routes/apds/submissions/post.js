import loggerFactory from '../../../logger/index.js';
import { updateAPDReviewStatus as urs } from '../../../db/apds.js';

const logger = loggerFactory('apds/submissions get');

export default (app, { updateAPDReviewStatus = urs } = {}) => {
  logger.silly('setting up POST /apds/submissions route');

  app.post('/apds/submissions', async (req, res, next) => {
    if (!req?.headers?.apikey) {
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
      const statuses = await updateAPDReviewStatus({ updates: req.body });
      return res.send(statuses);
    } catch (e) {
      logger.error({ id: req.id, message: 'Error updating APDs' });
      logger.error({ id: req.id, message: e });
      return next({ message: 'Error updating APDs' });
    }
  });
};
