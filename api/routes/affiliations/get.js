import loggerFactory from '../../logger';
import { getAffiliationsByUserId as _getAffiliationsByUserId } from '../../db';
import { loggedIn } from '../../middleware';

const logger = loggerFactory('affiliations route get');

export default (
  app,
  { getAffiliationsByUserId = _getAffiliationsByUserId } = {}
) => {
  app.get('/affiliations/me', loggedIn, async (request, response, next) => {
    logger.info({
      id: request.id,
      message: `handling GET /me endpoint}`
    });
    try {
      const resp = await getAffiliationsByUserId(request.user.id);
      return response.send(resp);
    } catch (e) {
      return next(e);
    }
  });
};
