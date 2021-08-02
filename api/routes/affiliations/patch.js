const auditor = require('../../audit');
const logger = require('../../logger')('affiliations');
const { raw: knex } = require('../../db');
const { can, validForState } = require('../../middleware');

const { DISABLE_ACCOUNT, ENABLE_ACCOUNT, MODIFY_ACCOUNT } = auditor.actions;

// map affiliation status to audit actions
const statusToAction = status => {
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
};

module.exports = (app, { db = knex } = {}) => {
  app.patch(
    '/states/:stateId/affiliations/:id',
    can('edit-affiliations'),
    validForState('stateId'),
    async (request, response, next) => {
      const userId = request.user.id;
      const { stateId, id } = request.params;

      if (!request.body || !request.body.status || !request.body.roleId) {
        logger.error({
          id: request.id,
          message: 'affiliation status or roleId not provided'
        });
        response
          .status(400)
          .send({ error: 'affiliation status or roleId not provided' })
          .end();
        return;
      }

      // Check that user is not editing themselves
      const { user_id: affiliationUserId } = await db('auth_affiliations')
        .select('user_id')
        .where({ state_id: stateId, id })
        .first();
        
        if (userId === affiliationUserId) {
          logger.error({
            id: request.id,
            message: `user ${request.user.id} is attempting to edit their own role`
          });
          response.status(403).end();
          return;
        }
        
        const { status, roleId } = request.body;
        const audit = auditor(statusToAction(status), request);
        
        
      // Lookup role name and set expiration date accordingly
      const { name: roleName } = await db('auth_roles')
        .select('name')
        .where({'auth_roles.id': roleId })
        .first();

      let expirationDate = null;
      const today = new Date();
      if(roleName === 'eAPD State Admin') {
        expirationDate = new Date(today.getFullYear() + 1, '06', '30');
      }
      if(roleName === 'eAPD State Staff' || roleName === 'eAPD State Contractor') {
        expirationDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      }
      

      try {
        db('auth_affiliations')
          .where({ state_id: stateId, id })
          .returning('*')
          .update({
            role_id: status !== 'approved' ? null : roleId,
            status,
            updated_by: userId,
            expires_at: expirationDate
          })
          .then(rows => rows[0])
          .then(row =>
            audit.target({
              userId: row.user_id,
              stateId: row.state_id,
              roleId: row.role_id,
              status: row.status
            })
          )
          .then(() => audit.log())
          .then(() => response.status(200).end())
          .catch(next);
      } catch (e) {
        logger.error({ id: request.id, message: e });
        next(e);
      }
    }
  );

};
