const logger = require('../../logger')('apds route put');
const {
  can,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../middleware');

const syncResponder = req => ({ model: req.meta.apd, action: 'update-apd' });

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put(
    '/apds/:id',
    can('edit-document'),
    userCanEditAPD(),
    synchronizeSpecific(syncResponder)
  );
};

module.exports.syncResponder = syncResponder;
