import loggerFactory from '../../../logger/index.js';
import { can, userCanAccessAPD } from '../../../middleware/index.js';
import { createEventForAPD as ce } from '../../../db/index.js';

const logger = loggerFactory('apd event routes');

export default (app, { createEventForAPD = ce } = {}) => {
  logger.debug('setting up POST /apds/:id/events route');

  app.post(
    '/apds/:id/events',
    can('view-document'),
    userCanAccessAPD(),
    async (req, res) => {
      const userID = req.user.id;
      const apdID = req.params.id;
      const { eventType, metadata = null } = req.body;

      const eventID = await createEventForAPD({
        userID,
        apdID,
        eventType,
        metadata
      });

      if (eventID === null) {
        res.status(400).end();
      }

      res.send({ success: true });
    }
  );
};
