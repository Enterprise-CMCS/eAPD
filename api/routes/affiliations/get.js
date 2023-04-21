import loggerFactory from '../../logger/index.js';
import { getAffiliationsByUserId as _getAffiliationsByUserId } from '../../db/index.js';
import { loggedIn } from '../../middleware/index.js';
import { getAllStates as _getAllStates } from '../../db/states.js';
import { AFFILIATION_STATUSES, isSysAdmin } from '@cms-eapd/common';

const { APPROVED } = AFFILIATION_STATUSES;

const logger = loggerFactory('affiliations route get');

export default (
  app,
  {
    getAffiliationsByUserId = _getAffiliationsByUserId,
    getAllStates = _getAllStates
  } = {}
) => {
  app.get('/affiliations/me', loggedIn, async (request, response, next) => {
    logger.info({
      id: request.id,
      message: `handling GET /me endpoint}`
    });
    try {
      if (isSysAdmin(request.user.username)) {
        const allStates = await getAllStates();
        const resp = allStates.map(state => ({
          displayName: request.user.displayName,
          userId: request.user.id,
          stateId: state.id,
          role: 'eAPD System Admin',
          status: APPROVED
        }));
        return response.send(resp);
      }
      const resp = await getAffiliationsByUserId(request.user.id);
      return response.send(resp);
    } catch (e) {
      return next(e);
    }
  });
};
