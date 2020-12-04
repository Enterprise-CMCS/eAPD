const logger = require('../../logger')('affiliations route get');
const {
  getPopulatedAffiliationsByStateId: gas,
  getPopulatedAffiliationById: ga
} = require('../../db');
const { can } = require('../../middleware');

module.exports = (
  app,
  {
    getPopulatedAffiliationsByStateId = gas,
    getPopulatedAffiliationById = ga
  } = {}
) => {
  app.get(
    '/states/:stateId/affiliations',
    can('view-affiliations'),
    async (request, response, next) => {
      logger.info({
        id: request.id,
        message: `handling GET /states/${request.params.stateId}/affiliations`
      });
      const { stateId } = request.params;
      const { status = null } = request.query;

      try {
        if (stateId !== request.user.state.id) {
          logger.verbose('user does not have access to state');
          return response.status(401).end();
        }

        const affiliations = await getPopulatedAffiliationsByStateId({
          stateId,
          status
        });

        return response.send(affiliations);
      } catch (e) {
        return next(e);
      }
    }
  );

  app.get(
    '/states/:stateId/affiliations/:id',
    can('view-affiliations'),
    async (request, response, next) => {
      logger.info({
        id: request.id,
        message: `handling GET /states/${request.params.stateId}/affiliations/${request.params.id}`
      });
      const { stateId, id } = request.params;
      console.log('user state', request.user.state.id);
      try {
        if (stateId !== request.user.state.id) {
          logger.verbose('user does not have access to state');
          return response.status(401).end();
        }

        const affiliation = await getPopulatedAffiliationById({
          stateId,
          affiliationId: id
        });

        if (affiliation) {
          return response.send(affiliation);
        }

        logger.verbose({
          id: request.id,
          message: `affiliation ${id} does not exist in ${stateId}`
        });
        return response.status(400).end();
      } catch (e) {
        return next(e);
      }
    }
  );
};
