const logger = require('../../../logger')('apd activites route put');
const pick = require('lodash.pick');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const { userCanEditAPD: defaultUserCanEditAPD } = require('../utils');
const loggedIn = require('../../../auth/middleware').loggedIn;

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  userCanEditAPD = defaultUserCanEditAPD
) => {
  logger.silly('setting up PUT /activities/:id route');
  app.put('/activities/:id', loggedIn, async (req, res) => {
    logger.silly(req, 'handling PUT /activities/:id route');
    logger.silly(req, `attempting to update activity [${req.params.id}]`);

    try {
      const activityID = +req.params.id;
      const activity = await ActivityModel.where({ id: activityID }).fetch({
        withRelated: ['apd.activities', 'goals.objectives']
      });
      if (!activity) {
        logger.verbose(req, 'activity not found');
        return res.status(404).end();
      }
      const apdID = activity.related('apd').get('id');

      if (!await userCanEditAPD(req.user.id, apdID)) {
        logger.verbose(
          req,
          'user (state) not associated with the apd this activity belongs to'
        );
        return res.status(404).end();
      }

      const newData = pick(req.body, ['name', 'description']);

      if (typeof newData.name !== 'string' || newData.name.length < 1) {
        logger.verbose(req, 'Invalid activity name');
        return res
          .status(400)
          .send({ error: 'update-activity-invalid-name' })
          .end();
      }

      const hasNameConflict = activity
        .related('apd')
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
  });
};
