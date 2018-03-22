const logger = require('../../../logger')('apd activites route put');
const pick = require('lodash.pick');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../middleware');

module.exports = (app, ActivityModel = defaultActivityModel) => {
  logger.silly('setting up PUT /activities/:id route');
  app.put(
    '/activities/:id',
    loggedIn,
    loadActivity(),
    userCanEditAPD(ActivityModel),
    async (req, res) => {
      logger.silly(req, 'handling PUT /activities/:id route');
      logger.silly(req, `attempting to update activity [${req.params.id}]`);

      try {
        const activity = req.meta.activity;
        const activityID = activity.get('id');
        const apd = req.meta.apd;
        const newData = pick(req.body, ['name', 'description']);

        if (typeof newData.name !== 'string' || newData.name.length < 1) {
          logger.verbose(req, 'Invalid activity name');
          return res
            .status(400)
            .send({ error: 'update-activity-invalid-name' })
            .end();
        }

        const hasNameConflict = apd
          .related('activities')
          .some(
            a => a.get('id') !== activityID && a.get('name') === newData.name
          );

        if (hasNameConflict) {
          logger.verbose(req, 'Activity name already exists for this APD');
          return res
            .status(400)
            .send({ error: 'update-activity-name-exists' })
            .end();
        }

        activity.set(newData);
        await activity.save();
        return res.send(activity.toJSON());
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
