const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app) => {
  app.patch('/states/:stateId/affiliationRequests/:id', can('edit-roles'), async (request, response) => {
    const userId = request.user.id;
    const { stateId, id } = request.params;
    const { status, roleId } = request.query;

    await knex('affiliation_requests')
      .where({ state_id: stateId, id })
      .returning('*')
      .update({
        status,
        updated_by: userId
      })
      .then(row => knex('affiliations')
      .insert({
        user_id: row.user_id,
        state_id: row.state_id,
        role_id: roleId,
        created_by: userId
      }))
      .then(() => response.status(201).end())
      .catch(() => response.status(404).end());
  });

};
