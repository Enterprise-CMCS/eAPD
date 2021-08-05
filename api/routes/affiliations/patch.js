const auditor = require('../../audit');
const logger = require('../../logger')('affiliations');
const { raw: knex } = require('../../db');
const { can, validForState } = require('../../middleware');
const { updateAuthAffiliation } = require('../../db/affiliations')

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

module.exports = (app, { db = knex, updateAuthAffiliation_ = updateAuthAffiliation } = {}) => {
  app.patch(
    '/states/:stateId/affiliations/:id',
    can('edit-affiliations'),
    validForState('stateId'),
    async (request, response, next) => {
      const userId = request.user.id;
      const { stateId, id } = request.params;
      const {status, roleId} = request.body

      if (!request.body || !status || !roleId) {
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

      const audit = auditor(statusToAction(request.body.status), request);

      try{
        await updateAuthAffiliation_({
          db,
          stateId,
          newRoleId: request.body.roleId,
          newStatus: request.body.status,
          changedBy: userId,
          affiliationId: id
        })


        audit.target({
          userId: id,
          stateId,
          roleId,
          status
        })
        audit.log()
        response.status(200).end()
      }
      catch(e){
        logger.error({ id: request.id, message: e });
        next(e);
      }
    }
  );

};
