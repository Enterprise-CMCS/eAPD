const logger = require('../../../logger')('apd activites route put');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const {
  loggedIn,
  loadActivity,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../../middleware');

const syncResponder = req => req.meta.activity;

module.exports = (app, ActivityModel = defaultActivityModel) => {
  logger.silly('setting up PUT /activities/:id route');
  app.put(
    '/activities/:id',
    loggedIn,
    loadActivity(),
    userCanEditAPD(ActivityModel),
    synchronizeSpecific(syncResponder)
  );
};

module.exports.syncResponder = syncResponder;
