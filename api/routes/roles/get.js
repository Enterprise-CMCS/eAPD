const { getAllActiveRoles: gr } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app, { getAllActiveRoles = gr } = {}) => {
  app.get('/roles', can('view-roles'), (request, response, next) => {
    console.log(' inside /roles', getAllActiveRoles);
    getAllActiveRoles()
      .then(rows => response.status(200).json(rows))
      .catch(next);
  });
};
