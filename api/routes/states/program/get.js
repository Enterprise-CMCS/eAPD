const logger = require('../../../logger')('states/program route get');
const defaultStateModel = require('../../../db').models.state;
const defaultUserModel = require('../../../db').models.user;
const can = require('../../../auth/middleware').can;
const loggedIn = require('../../../auth/middleware').loggedIn;

module.exports = (
  app,
  StateModel = defaultStateModel,
  UserModel = defaultUserModel
) => {
  logger.silly('setting up GET /states/:id/program route');
  app.get('/states/:id/program', can('view-state'), async (req, res) => {
    logger.silly(req, 'handling up GET /states/:id/program route');
    try {
      const state = await StateModel.where({ id: req.params.id }).fetch();
      if (!state) {
        logger.verbose(`no such state [${req.params.id}]`);
        res.status(404).end();
      } else {
        const programInfo = state.pick(['program_benefits', 'program_vision']);
        logger.silly(req, 'got the state program info');
        logger.silly(req, programInfo);
        res.send(programInfo);
      }
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });

  logger.silly('setting up GET /states/program route');
  app.get('/states/program', loggedIn, async (req, res) => {
    logger.silly(req, 'handling up GET /states/program route');
    try {
      const user = await UserModel.where({ id: req.user.id }).fetch({
        withRelated: ['state']
      });
      const state = user.related('state');
      if (!state.get('id')) {
        logger.verbose('user does not have an associated state');
        return res.status(403).end();
      }

      logger.silly(
        req,
        `user's state is [${state.get('id')}: ${state.get('name')}]`
      );

      const programInfo = state.pick(['program_benefits', 'program_vision']);

      logger.silly(req, 'got the state program info');
      logger.silly(req, programInfo);
      return res.send(programInfo);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
