const logger = require('../../logger')('apds route put');
const {
  loggedIn,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../middleware');

const syncResponder = req => ({ model: req.meta.apd, action: 'update-apd' });

module.exports = app => {
  logger.silly('setting up PUT /apds/:id route');
  app.put(
    '/apds/:id',
    loggedIn,
    userCanEditAPD(),
    synchronizeSpecific(syncResponder)
  );
};

module.exports.syncResponder = syncResponder;
