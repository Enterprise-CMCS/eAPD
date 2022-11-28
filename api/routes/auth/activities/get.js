import { getAuthActivities as ga } from '../../../db';
import { can } from '../../../middleware';

export default (app, { getAuthActivities = ga } = {}) => {
  app.get('/auth/activities', can('view-roles'), async (req, res, next) => {
    await getAuthActivities()
      .then(activities => res.send(activities))
      .catch(next);
  });
};
