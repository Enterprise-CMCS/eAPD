const logger = require('../../logger')('apds route get');
const { knex } = require('../../db');
const { can } = require('../../middleware');

module.exports = (app, { db = knex } = {}) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', can('view-document'), async (req, res) => {
    logger.silly(req, 'handling GET /apds');

    try {
      const stateId = req.user.state.id;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const apds = (await db('apds')
        .where({ state_id: stateId })
        .select(['document', 'id', 'status', 'updated_at'])).map(
        // eslint-disable-next-line camelcase
        ({ document: { name, years }, id, status, updated_at }) => ({
          id,
          name,
          status,
          updated: updated_at,
          years
        })
      );

      logger.silly(req, `got apds:`);
      logger.silly(req, apds.map(({ id, name }) => ({ id, name })));
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

      const apdFromDB = await db('apds')
        .where({ id: req.params.id, state_id: stateId })
        .first('document', 'id', 'state_id', 'status', 'updated_at');

      if (apdFromDB) {
        const apd = {
          ...apdFromDB.document,
          id: apdFromDB.id,
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
