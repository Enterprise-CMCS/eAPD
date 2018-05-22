const logger = require('../../../logger')('apd activites route put');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const {
  can,
  loadActivity,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../../middleware');

const putters = [
  null,
  'approaches',
  'contractorResources',
  'costAllocation',
  'expenses',
  'goals',
  'schedule',
  'statePersonnel'
];

module.exports = (app, ActivityModel = defaultActivityModel) => {
  putters.forEach(putter => {
    logger.silly(
      `setting up PUT /activities/:id${putter ? `/${putter}` : ''} route`
    );

    const syncResponder = req => {
      if (putter) {
        req.body = { [putter]: req.body };
      }
      return {
        model: req.meta.activity,
        modelClass: ActivityModel,
        action: 'update-activity'
      };
    };
    module.exports.syncResponders[putter || 'base'] = syncResponder;

    app.put(
      `/activities/:id${putter ? `/${putter}` : ''}`,
      can('edit-document'),
      loadActivity(),
      userCanEditAPD(ActivityModel),
      synchronizeSpecific(syncResponder)
    );
  });
};

module.exports.syncResponders = {};
