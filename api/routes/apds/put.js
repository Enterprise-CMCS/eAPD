const logger = require('../../logger')('apds route put');
const {
  apd: defaultApdModel,
  state: defaultStateModel
} = require('../../db').models;
const {
  can,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../middleware');

const syncResponder = (ApdModel = defaultApdModel) => req => ({
  model: req.meta.apd,
  modelClass: ApdModel,
  action: 'update-apd'
});

const updateStateProfile = (StateModel = defaultStateModel) => async req => {
  const { pointsOfContact, stateProfile } = req.body;
  if (pointsOfContact || stateProfile) {
    const state = await StateModel.where({ id: req.user.state }).fetch();
    if (pointsOfContact) {
      state.set(
        'state_pocs',
        pointsOfContact.map(p => ({
          // don't save the id
          name: p.name,
          position: p.position,
          email: p.email
        }))
      );
    }
    if (stateProfile) {
      state.set('medicaid_office', stateProfile);
    }
    await state.save();
  }
};

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    synchronizeSpecific(syncResponder(), {
      afterSync: updateStateProfile()
    })
  );
};

module.exports.syncResponder = syncResponder;
module.exports.updateStateProfile = updateStateProfile;
