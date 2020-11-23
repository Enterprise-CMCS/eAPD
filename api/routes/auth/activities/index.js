const { getAuthActivities: ga } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getAuthActivities = ga } = {}) => {
  app.get('/auth/activities', can('view-roles'), (req, res, next) => {
    getAuthActivities()
      .then(activities => res.send(activities))
      .catch(next);
  });
};
