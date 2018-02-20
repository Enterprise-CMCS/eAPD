const defaultActivityModel = require('../../db').models.activity;
const can = require('../../auth/middleware').can;

module.exports = (app, ActivityModel = defaultActivityModel) => {
  app.get('/activities', can('view-activities'), async (req, res) => {
    try {
      const activities = await ActivityModel.fetchAll({ columns: ['id', 'name'] });
      res.send(activities);
    } catch (e) {
      res.status(500).end();
    }
  });
};
