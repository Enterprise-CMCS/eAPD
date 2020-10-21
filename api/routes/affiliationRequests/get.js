const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app) => {
  app.get('/states/:stateId/affiliationRequests', can('view-users'), async (request, response) => {
    const { stateId } = request.params;
    await knex('affiliation_requests')
      .where({ state_id: stateId })
      .then(rows => response.status(200).json(rows))
      .catch(() => response.status(404).end());
  });

  app.get('/states/:stateId/affiliationRequests/:id', can('view-users'), async (request, response) => {
    const { stateId, id } = request.params;
    await knex('affiliation_requests')
      .where({ state_id: stateId, id })
      .then(rows => response.status(200).json(rows))
      .catch(() => response.status(404).end());
  });
};
