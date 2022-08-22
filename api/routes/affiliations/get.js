const logger = require('../../logger')('affiliations route get');
const {
  getAffiliationsByUserId: _getAffiliationsByUserId
} = require('../../db');
const { loggedIn } = require('../../middleware');

module.exports = (
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
