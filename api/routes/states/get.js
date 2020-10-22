const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = (app) => {
  app.get('/states', async (request, response) => {
    await knex('states').select('id', 'name')
      .then(rows => response.status(200).json(rows));
  });

  app.get('/states/:id', loggedIn, async (request, response) => {
    const { id } = request.params;
    await knex('states').where({ id })
      .then(rows => response.status(200).json(rows[0]))
      .catch(() => response.status(404).end());
  });
}
