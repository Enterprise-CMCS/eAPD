const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = (app) => {
  app.get('/states', async (request, response, next) => {
    await knex('states').select('id', 'name')
      .then(rows => response.status(200).json(rows))
      .catch(next);
  });

  app.get('/states/:id', loggedIn, async (request, response, next) => {
    const { id } = request.params;
    await knex('states')
      .where({ id })
      .first()
      .then(row => {
        if (row) {
          response.status(200).json(row);
        } else {
          response.status(400).end();
        }
      })
      .catch(next);
  });
}
