const logger = require('../../../logger')('auth activities route index');
const defaultActivityModel = require('../../../db').models.activity;
const { can } = require('../../../middleware');

module.exports = (app, ActivityModel = defaultActivityModel) => {
  logger.silly('setting up GET /auth/activities route');
  app.get('/auth/activities', can('view-roles'), async (req, res) => {
    logger.silly(req, 'handling GET /auth/activities');
    try {
      const activities = await ActivityModel.fetchAll();
      logger.silly(
        req,
        `got all the activities: ${activities
          .toJSON()
          .reduce((acc, { name }) => [...acc, name], [])
          .join(', ')}`
      );
      res.send(activities.toJSON());
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
