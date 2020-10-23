const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = (app) => {
  app.get('/states', async (request, response) => {
    await knex('states').select('id', 'name')
      .then(rows => response.status(200).json(rows));
  });

  app.get('/states/:id', loggedIn, async (request, response) => {
    const { id } = request.params;
    await knex('states')
      .where({ id })
      .first()
      .then(row => {
        if (row) {
          response.status(200).json(row);
        } else {
          throw new Error('Not Found');
        }
      })
      .catch((err) => response.status(404).send(err).end());
  });
}
