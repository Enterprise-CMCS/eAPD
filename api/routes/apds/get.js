const logger = require('../../logger')('apds route get');
const { getAllAPDsByState: gas, getAPDByIDAndState: ga } = require('../../db');
const { can } = require('../../middleware');

module.exports = (
  app,
  { getAllAPDsByState = gas, getAPDByIDAndState = ga } = {}
) => {
  logger.debug('setting up GET /apds route');

  app.get('/apds', can('view-document'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling GET /apds' });

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

    logger.debug({ id: req.id, message: `got apds: ${apds.map(({ id, name }) => ({ id, name }))}` });
    return res.send(apds);
  });

  app.get('/apds/:id(\\d+)', can('view-document'), async (req, res) => {
    logger.debug({ id: req.id, message: 'handling GET /apds/:id' });

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

      logger.debug({ id: req.id, message: `got single apd, id=${apd.id}, name="${apd.name}"` });
      return res.send(apd);
    }

    logger.verbose({ id: req.id, message: 'apd does not exist' });
    return res.status(400).end();
  });
};
