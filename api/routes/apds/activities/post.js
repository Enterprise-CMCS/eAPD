const logger = require('../../../logger')('apd activites route put');
const {
  apdActivity: defaultActivityModel,
  apd: defaultApdModel
} = require('../../../db').models;
const { userCanEditAPD } = require('../utils');
const loggedIn = require('../../../auth/middleware').loggedIn;

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ApdModel = defaultApdModel
) => {
  const check404 = async req => {
    const apdID = +req.params.apdID;

    if (!await userCanEditAPD(req.user.id, apdID)) {
      logger.verbose(req, 'user (state) not associated with this apd');
      return false;
    }

    const apd = await ApdModel.where({ id: apdID }).fetch({
      withRelated: ['activities']
    });
    if (!apd) {
      logger.verbose(req, `no such apd [${apdID}]`);
      return false;
    }

    return apd;
  };

  logger.silly('setting up POST /apds/:apdID/activities route');
  app.post('/apds/:apdID/activities', loggedIn, async (req, res) => {
    logger.silly(req, 'handling POST /apds/:apdID/activities route');
    logger.silly(
      req,
      `attempting to add an activity on apd [${req.params.apdID}]`
    );

    try {
      const apd = await check404(req, res);
      if (!apd) {
        return res.status(404).end();
      }

      if (typeof req.body.name !== 'string' || req.body.name.length < 1) {
        logger.verbose(req, 'Invalid activity name');
        return res
          .status(400)
          .send({ error: 'add-activity-invalid-name' })
          .end();
      }

      const existingNames = apd.related('activities').pluck(['name']);
      if (existingNames.includes(req.body.name)) {
        logger.verbose(req, 'Activity name already exists for this APD');
        return res
          .status(400)
          .send({ error: 'add-activity-name-exists' })
          .end();
      }

      const activity = ActivityModel.forge({
        name: req.body.name,
        apd_id: apd.get('id')
      });

      await activity.save();
      return res.send(activity.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};

/*

PUT /apds/:apd_id/activities
  - replaces the list of activities for the APD with the new list

PUT /apds/:apd_id/activities/:activity_id
  - replaces the name and/or description for the activity

PUT /apds/:apd_id/activities/:activity_id/goals
  - replaces the list of goals for the activity with the new list
*/
