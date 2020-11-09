const logger = require('../../../logger')('auth activities route index');
const { getAuthActivities: ga } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getAuthActivities = ga } = {}) => {
  logger.silly('setting up GET /auth/activities route');
  app.get('/auth/activities', can('view-roles'), async (req, res) => {
    logger.silly({ id: req.id, message: 'handling GET /auth/activities' });
    try {
      const activities = await getAuthActivities();
      logger.silly(
        req,
        `got all the activities: ${activities
          .map(({ name }) => name)
          .join(', ')}`
      );
      res.send(activities);
    } catch (e) {
      logger.error({ id: req.id, message: e });
      res.status(500).end();
    }
  });
};
