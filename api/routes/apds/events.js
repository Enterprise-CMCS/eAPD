const logger = require('../../logger')('apd event routes');
const { can, userCanAccessAPD } = require('../../middleware');
const { createEventForAPD: ce } = require('../../db');
const { ERROR_MESSAGES } = require('../openAPI/helpers');

module.exports = (app, { createEventForAPD = ce } = {}) => {
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
        res
          .status(400)
          .send({ error: ERROR_MESSAGES[400] })
          .end();
      }

      res.send({ success: true });
    }
  );
};
