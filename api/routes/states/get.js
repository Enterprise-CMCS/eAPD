const logger = require('../../logger')('states route get');
const defaultStateModel = require('../../db').models.state;
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;
const loggedIn = require('../../auth/middleware').loggedIn;

const stateFields = [
  'id',
  'medicaid_office',
  'name',
  'program_benefits',
  'program_vision',
  'state_pocs'
];

module.exports = (
  app,
  StateModel = defaultStateModel,
  UserModel = defaultUserModel
) => {
  const get = async (req, res) => {
    logger.silly(req, 'handling GET /states route');
    try {
      let state;
      if (req.params.id) {
        state = await StateModel.where({
          id: req.params.id.toLowerCase()
        }).fetch();
      } else {
        const user = await UserModel.where({ id: req.user.id }).fetch({
          withRelated: ['state']
        });
        state = user.related('state');
        if (!state.get('id')) {
          logger.verbose('user does not have an associated state');
          return res.status(401).end();
        }
      }
      if (!state) {
        logger.verbose(`no such state [${req.params.id}]`);
        return res.status(404).end();
      }
      const programInfo = state.pick(stateFields);
      logger.silly(req, 'got the state program info');
      logger.silly(req, programInfo);
      return res.send(programInfo);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  };

  logger.silly('setting up GET /states/:id route');
  app.get('/states/:id', can('view-state'), get);

  logger.silly('setting up GET /states route');
  app.get('/states', loggedIn, get);
};
