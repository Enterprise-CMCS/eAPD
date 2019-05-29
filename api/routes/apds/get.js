const logger = require('../../logger')('apds route get');
const defaultApdModel = require('../../db').models.apd;
const { can } = require('../../middleware');

module.exports = (app, ApdModel = defaultApdModel) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', can('view-document'), async (req, res) => {
    logger.silly(req, 'handling GET /apds');

    try {
      const stateId = req.user.state;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const whereCondits = { state_id: stateId };
      const apds = (await ApdModel.where(whereCondits).fetchAll())
        .toJSON()
        .map(({ id, name, status, updated, years }) => ({
          id,
          name,
          status,
          updated,
          years
        }));

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
      const stateId = req.user.state;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const whereCondits = { id: req.params.id, state_id: stateId };
      const apds = (await ApdModel.where(whereCondits).fetchAll({
        withRelated: ApdModel.withRelated
      })).toJSON();

      if (apds.length) {
        logger.silly(
          req,
          `got single apd, id=${apds[0].id}, name="${apds[0].name}"`
        );
        return res.send(apds[0]);
      }

      logger.verbose('apd does not exist');
      return res.status(404).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
