const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = (app) => {
  app.post('/states/:stateId/affiliationRequests', loggedIn, async (request, response) => {
    const userId = request.user.id;
    const { stateId } = request.params;

    await knex('states')
      .where({ id: stateId })
      .first()
      .then(({ id }) => knex('affiliation_requests')
      .returning(['id'])
      .insert({
        user_id: userId,
        state_id: id
      }))
      .then(row => response.status(201).json(row[0]))
      .catch(() => response.status(404).end());
  });
}
