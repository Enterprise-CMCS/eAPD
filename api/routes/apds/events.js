const logger = require('../../logger')('apd event routes');
const { can, userCanAccessAPD } = require('../../middleware');
const { createEventForAPD: ce } = require('../../db');

module.exports = (app, { createEventForAPD = ce } = {}) => {
  logger.debug('setting up POST /apds/:id/events route');

  app.post(
    '/apds/:id/events',
    can('view-document'),
    userCanAccessAPD(),
    async (req, res, next) => {
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
        next({ status: 422 });
      }

      res.send({ success: true });
    }
  );
};
