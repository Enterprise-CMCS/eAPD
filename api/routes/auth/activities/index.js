const logger = require('../../../logger')('auth activities route index');
const { getAuthActivities: ga } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getAuthActivities = ga } = {}) => {
  logger.debug('setting up GET /auth/activities route');
  app.get('/auth/activities', can('view-roles'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling GET /auth/activities' });
    const activities = await getAuthActivities();
    logger.debug(
      req,
      `got all the activities: ${activities
        .map(({ name }) => name)
        .join(', ')}`
    );
    res.send(activities);
  });
};
