import { getActiveAuthRoles as gr } from '../../../db/index.js';
import { can } from '../../../middleware/index.js';

export default (app, { getActiveAuthRoles = gr } = {}) => {
  app.get('/auth/roles', can('view-roles'), async (req, res, next) => {
    await getActiveAuthRoles()
      .then(roles => res.send(roles))
      .catch(next);
  });
};
