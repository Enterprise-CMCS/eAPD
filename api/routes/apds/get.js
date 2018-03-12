const logger = require('../../logger')('users route get');
const defaultApdModel = require('../../db').models.apd;
const defaultUserModel = require('../../db').models.user;
const loggedIn = require('../../auth/middleware').loggedIn;

module.exports = (
  app,
  ApdModel = defaultApdModel,
  UserModel = defaultUserModel
) => {
  logger.silly('setting up GET /apds route');

  app.get('/apds', loggedIn, async (req, res) => {
    logger.silly(req, 'handling GET /apds');

    try {
      // TODO: we should have a helper method that fetches
      // and returns state/stateId given userId
      const user = await UserModel.where({ id: req.user.id }).fetch({
        withRelated: ['state']
      });
      const state = user.related('state');
      const stateId = state.get('id');

      if (!stateId) {
        logger.verbose('user does not have an associated state');
        return res.status(401).end();
      }

      const whereCondits = { state_id: stateId };
      const apds = (await ApdModel.where(whereCondits).fetchAll()).toJSON();

      logger.silly(req, `got apds:`);
      logger.silly(req, apds);
      return res.send(apds);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
