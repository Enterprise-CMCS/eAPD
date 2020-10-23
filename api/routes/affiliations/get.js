const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app) => {
  app.get('/states/:stateId/affiliations', can('view-users'), async (request, response) => {
    const { stateId } = request.params;
    await knex('affiliations')
      .where({ state_id: stateId })
      .then(rows => response.status(200).json(rows))
      .catch((err) => response.status(404).send(err).end());
  });

  app.get('/states/:stateId/affiliations/:id', can('view-users'), async (request, response) => {
    const { stateId, id } = request.params;
    await knex('affiliations')
      .where({ state_id: stateId, id })
      .then(rows => response.status(200).json(rows))
      .catch(() => response.status(404).end());
  });
};
