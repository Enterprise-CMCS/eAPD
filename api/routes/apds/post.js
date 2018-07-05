const logger = require('../../logger')('apds route post');
const {
  apd: defaultApdModel,
  apdPointOfContact: defaultPOCModel,
  state: defaultStateModel
} = require('../../db').models;
const { can } = require('../../middleware');

module.exports = (
  app,
  ApdModel = defaultApdModel,
  POCModel = defaultPOCModel,
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

      if (state.get('state_pocs')) {
        await Promise.all(
          state.get('state_pocs').map(async poc => {
            const newPOC = POCModel.forge({ ...poc, apd_id: newApd.get('id') });
            await newPOC.save();
          })
        );
      }

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
