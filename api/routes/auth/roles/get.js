import { getActiveAuthRoles as gr } from '../../../db';
import { can } from '../../../middleware';

export default (app, { getActiveAuthRoles = gr } = {}) => {
  app.get('/auth/roles', can('view-roles'), async (req, res, next) => {
    await getActiveAuthRoles()
      .then(roles => res.send(roles))
      .catch(next);
  });
};
