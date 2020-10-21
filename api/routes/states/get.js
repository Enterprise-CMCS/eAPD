const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app) => {
  app.get('/states', async (request, response) => {
    await knex('states').select('id', 'name')
      .then(rows => response.json(rows));
  });

  app.get('/states/:id', can('view-document'), async (request, response) => {
    const { id } = request.params;
    await knex('states').where({ id })
      .then(rows => response.json(rows[0]))
      .catch(() => response.status(404).end());
  });
}
