const { raw: knex } = require('../../db');
const { loggedIn } = require('../../middleware/auth');

module.exports = app => {
  app.post('/states/:stateId/affiliations', loggedIn, (request, response) => {
    const userId = request.user.id;
    const { stateId } = request.params;

    knex('auth_affiliations')
      .returning(['id'])
      .insert({
        user_id: userId,
        state_id: stateId
        // status: 'requested' // default status enum value
      })
      .then(rows => response.status(201).json(rows[0]))
      .catch(() => response.status(400).end());
  });
};
