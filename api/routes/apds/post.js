const logger = require('../../logger')('apds route post');
const {
  apd: defaultApdModel,
  state: defaultStateModel
} = require('../../db').models;
const { can } = require('../../middleware');

module.exports = (
  app,
  ApdModel = defaultApdModel,
  StateModel = defaultStateModel
) => {
  logger.silly('setting up POST /apds/ route');
  app.post('/apds', can('edit-document'), async (req, res) => {
    logger.silly(req, 'handling POST /apds route');

    try {
      const newApd = ApdModel.forge({
        state_id: req.user.state,
        status: 'draft'
      });

      const state = await StateModel.where({ id: req.user.state }).fetch();
      if (state.get('medicaid_office')) {
        newApd.set({ stateProfile: state.get('medicaid_office') });
      }

      await newApd.save();

      const apd = await ApdModel.where({ id: newApd.get('id') }).fetch({
        withRelated: ApdModel.withRelated
      });
      res.send(apd);
    } catch (e) {
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
