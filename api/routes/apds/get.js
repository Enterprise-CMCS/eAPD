const logger = require('../../logger')('apds route get');
const { getAllAPDsByState: gas, getAPDByIDAndState: ga } = require('../../db');
const { can } = require('../../middleware');

module.exports = (
  app,
  { getAllAPDsByState = gas, getAPDByIDAndState = ga } = {}
) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', can('view-document'), async (req, res) => {
    logger.silly(req, 'handling GET /apds');

    try {
      const stateId = req.user.state.id;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const apds = (await getAllAPDsByState(stateId)).map(
        ({
          // eslint-disable-next-line camelcase
          created_at,
          document: { name, years },
          id,
          status,
          // eslint-disable-next-line camelcase
          updated_at
        }) => ({
          id,
          created: created_at,
          name,
          status,
          updated: updated_at,
          years
        })
      );

      logger.silly(req, `got apds:`);
      logger.silly(
        req,
        apds.map(({ id, name }) => ({ id, name }))
      );
      return res.send(apds);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });

  app.get('/apds/:id(\\d+)', can('view-document'), async (req, res) => {
    logger.silly(req, 'handling GET /apds/:id');

    try {
      const stateId = req.user.state.id;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const apdFromDB = await getAPDByIDAndState(req.params.id, stateId);

      if (apdFromDB) {
        const apd = {
          ...apdFromDB.document,
          id: apdFromDB.id,
          created: apdFromDB.created_at,
          state: apdFromDB.state_id,
          status: apdFromDB.status,
          updated: apdFromDB.updated_at
        };

        logger.silly(req, `got single apd, id=${apd.id}, name="${apd.name}"`);
        return res.send(apd);
      }

      logger.verbose('apd does not exist');
      return res.status(404).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
