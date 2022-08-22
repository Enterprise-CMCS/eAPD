const { getActiveAuthRoles: gr } = require('../../../db');
const { can } = require('../../../middleware');

module.exports = (app, { getActiveAuthRoles = gr } = {}) => {
  app.get('/auth/roles', can('view-roles'), async (req, res, next) => {
    await getActiveAuthRoles()
      .then(roles => res.send(roles))
      .catch(next);
  });
};
