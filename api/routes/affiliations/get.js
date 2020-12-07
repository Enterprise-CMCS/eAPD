const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app) => {
  app.get('/states/:stateId/affiliations', can('view-affiliations'), (request, response) => {
    const { stateId } = request.params;
    knex('auth_affiliations')
      .where({ state_id: stateId })
      .then(rows => response.status(200).json(rows))
      .catch(() => response.status(400).end());
  });

  app.get('/states/:stateId/affiliations/:id', can('view-affiliations'), (request, response) => {
    const { stateId, id } = request.params;
    knex('auth_affiliations')
      .where({ state_id: stateId, id })
      .first()
      .then(row => response.status(200).json(row))
      .catch(() => response.status(400).end());
  });
};
