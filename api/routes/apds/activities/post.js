const logger = require('../../../logger')('apd activites route post');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const {
  loggedIn,
  synchronizeAll,
  userCanEditAPD
} = require('../../../middleware');

const syncResponder = (req, ActivityModel = defaultActivityModel) => ({
  modelClass: ActivityModel,
  foreignKey: { apd_id: req.meta.apd.get('id') }
});

module.exports = app => {
  logger.silly('setting up POST /apds/:id/activities route');
  app.post(
    '/apds/:id/activities',
    loggedIn,
    userCanEditAPD(),
    synchronizeAll(syncResponder)
  );
};

module.exports.syncResponder = syncResponder;
