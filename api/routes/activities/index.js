const logger = require('../../logger')('activities route index');
const defaultActivityModel = require('../../db').models.activity;
const can = require('../../auth/middleware').can;

module.exports = (app, ActivityModel = defaultActivityModel) => {
  logger.silly('setting up GET /activities route');
  app.get('/activities', can('view-activities'), async (req, res) => {
    logger.silly(req, 'handling GET /activities');
    try {
      const activities = (await ActivityModel.fetchAll({
        columns: ['id', 'name']
      })).map(a => ({ id: a.get('id'), name: a.get('name') }));
      logger.silly(req, `got activities:`);
      logger.silly(req, activities);
      res.send(activities);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
