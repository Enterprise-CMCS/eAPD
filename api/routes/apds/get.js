const logger = require('../../logger')('apds route get');
const defaultApdModel = require('../../db').models.apd;
const loggedIn = require('../../auth/middleware').loggedIn;

module.exports = (app, ApdModel = defaultApdModel) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', loggedIn, async (req, res) => {
    logger.silly(req, 'handling GET /apds');

    try {
      const stateId = req.user.state;

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const whereCondits = { state_id: stateId };
      const apds = (await ApdModel.where(whereCondits).fetchAll({
        withRelated: ['activities.goals.objectives', 'activities.approaches']
      })).toJSON();

      logger.silly(req, `got apds:`);
      logger.silly(req, apds);
      return res.send(apds);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
