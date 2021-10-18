const logger = require('../../../logger')('affiliations route get');
const {
  getPopulatedAffiliationsByStateId: _getPopulatedAffiliationsByStateId,
  getPopulatedAffiliationById: _getPopulatedAffiliationsById,
  getAllPopulatedAffiliations: _getAllPopulatedAffiliations,
} = require('../../../db');
const { can, validForState } = require('../../../middleware');

module.exports = (
  app,
  {
    getPopulatedAffiliationsByStateId = _getPopulatedAffiliationsByStateId,
    getPopulatedAffiliationById = _getPopulatedAffiliationsById,
    getAllPopulatedAffiliations = _getAllPopulatedAffiliations,
  } = {}
) => {
  app.get(
    '/states/:stateId/affiliations',
    can('view-affiliations'),
    validForState('stateId'),
    async (request, response, next) => {
      logger.info({
        id: request.id,
        message: `handling GET /states/${request.params.stateId}/affiliations`
      });
      const { stateId } = request.params;
      const { status = null } = request.query;

      try {
        if (stateId === 'fd') {
          const affiliations = await getAllPopulatedAffiliations({
            status
          });
          return response.send(affiliations);
        }
        const affiliations = await getPopulatedAffiliationsByStateId({
          stateId,
          status,
          isFedAdmin: request.user.role === 'eAPD Federal Admin'
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
    validForState('stateId'),
    async (request, response, next) => {
      logger.info({
        id: request.id,
        message: `handling GET /states/${request.params.stateId}/affiliations/${request.params.id}`
      });
      const { stateId, id } = request.params;
      try {
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
        return response.status(404).end();
      } catch (e) {
        return next(e);
      }
    }
  );

};
