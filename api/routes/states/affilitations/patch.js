import auditor, { actions } from '../../../audit.js';
import loggerFactory from '../../../logger/index.js';
import { can, validForState } from '../../../middleware/index.js';
import { updateAuthAffiliation } from '../../../db/affiliations.js';

const logger = loggerFactory('affiliations');

const { DISABLE_ACCOUNT, ENABLE_ACCOUNT, MODIFY_ACCOUNT } = actions;

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

export default (
  app,
  { updateAuthAffiliation_ = updateAuthAffiliation } = {}
) => {
  app.patch(
    '/states/:stateId/affiliations/:id',
    can('edit-affiliations'),
    validForState('stateId'),
    async (request, response, next) => {
      const userId = request.user.id;
      const userRole = request.user.role;

      const { stateId, id } = request.params;
      const { status, roleId } = request.body;

      if (!request.body || !status || !roleId) {
        logger.error({
          id: request.id,
          message: 'affiliation status or roleId not provided'
        });
        return response
          .status(400)
          .send({ error: 'affiliation status or roleId not provided' })
          .end();
      }

      const audit = auditor(statusToAction(status), request);

      try {
        await updateAuthAffiliation_({
          stateId,
          newRoleId: roleId,
          newStatus: status,
          changedBy: userId,
          changedByRole: userRole,
          affiliationId: id
        });
      } catch (e) {
        logger.error({ id: request.id, message: e });
        return next(e);
      }

      audit.target({
        userId: id,
        stateId,
        roleId,
        status
      });
      audit.log();
      return response.status(200).end();
    }
  );
};
