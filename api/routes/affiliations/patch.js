const auditor = require('../../audit');
const logger = require('../../logger')('affiliations');
const { raw: knex } = require('../../db');
const { can } = require('../../middleware');

const {
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  MODIFY_ACCOUNT
} = auditor.actions;

// map affiliation status to audit actions
const statusToAction = (status) => {
  switch (status) {
    case 'approved':
      return ENABLE_ACCOUNT;
    case 'denied':
    case 'revoked':
      return DISABLE_ACCOUNT;
    case 'requested':
    default:
      return MODIFY_ACCOUNT;
  }
}

module.exports = (app) => {
  app.patch('/states/:stateId/affiliations/:id', can('edit-affiliations'), async (request, response) => {
    const userId = request.user.id;
    const { stateId, id } = request.params;
    const { status, roleId } = request.body;
    const audit = auditor(statusToAction(status), request);

    await knex('auth_affiliations')
      .where({ state_id: stateId, id })
      .returning('*')
      .update({
        role_id: status !== 'approved' ? null : roleId,
        status,
        updated_by: userId,
      })
      .then(rows => rows[0])
      .then(row => audit.target({
        userId: row.user_id,
        stateId: row.state_id,
        roleId: row.role_id,
        status: row.status
      }))
      .then(() => audit.log())
      .then(() => response.status(200).end())
      .catch(err => {
        logger.error({ id: request.id, message: err });
        response.status(400).end();
      });
  });
};
