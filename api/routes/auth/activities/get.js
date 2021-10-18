const { getAuthActivities: ga } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getAuthActivities = ga } = {}) => {
  app.get('/auth/activities', can('view-roles'), async (req, res, next) => {
    await getAuthActivities()
      .then(activities => res.send(activities))
      .catch(next);
  });
};
