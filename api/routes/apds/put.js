const logger = require('../../logger')('apds route put');
const { apd: defaultApdModel } = require('../../db').models;
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

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    synchronizeSpecific(syncResponder())
  );
};

module.exports.syncResponder = syncResponder;
