const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = (app) => {
  app.post('/states/:stateId/affiliations', loggedIn, async (request, response) => {
    const userId = request.user.id;
    const { stateId } = request.params;

    await knex('auth_affiliations')
      .returning(['id'])
      .insert({
        user_id: userId,
        state_id: stateId,
        // status: 'requested' // default status enum value
      })
      .then(row => response.status(201).json(row[0]))
      .catch(() => response.status(404).end());
  });
}
