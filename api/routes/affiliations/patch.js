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

module.exports = (app, { db = knex } = {}) => {
  app.patch('/states/:stateId/affiliations/:id', can('edit-affiliations'), (request, response) => {
    const userId = request.user.id;
    const { stateId, id } = request.params;

    if (!request.body || !request.body.status || !request.body.roleId) {
      logger.error({ id: request.id, message: 'affiliation status or roleId not provided' });
      response.status(400).end();
      return;
    }

    const { status, roleId } = request.body;
    const audit = auditor(statusToAction(status), request);

    db('auth_affiliations')
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
      .catch(() => response.status(400).end());
  });
};
