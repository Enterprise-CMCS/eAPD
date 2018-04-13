const logger = require('../../../logger')('apd activites route post');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const { loggedIn, userCanEditAPD } = require('../../../middleware');

const syncActivitiesListWithDB = (
  newActivities,
  existingActivities,
  apdID,
  ActivityModel
) => {
  const models = [];

  existingActivities.forEach(existing => {
    const newInfo = newActivities.find(a => a.id === existing.get('id'));
    if (newInfo) {
      existing.set({ name: newInfo.name });
      models.push(existing);
    }
  });

  newActivities
    .filter(a => typeof a.id === 'undefined')
    .forEach(newActivity => {
      const activity = ActivityModel.forge({
        name: newActivity.name,
        apd_id: apdID
      });
      models.push(activity);
    });

  return models;
};

module.exports = (app, ActivityModel = defaultActivityModel) => {
  logger.silly('setting up POST /apds/:id/activities route');
  app.post(
    '/apds/:id/activities',
    loggedIn,
    userCanEditAPD(),
    async (req, res) => {
      logger.silly(req, 'handling POST /apds/:id/activities route');
      logger.silly(
        req,
        `attempting to add an activity on apd [${req.params.apdID}]`
      );

      try {
        const apd = req.meta.apd;

        const existingActivities = apd.related('activities');

        let models;

        if (Array.isArray(req.body)) {
          models = syncActivitiesListWithDB(
            req.body,
            existingActivities,
            apd.get('id'),
            ActivityModel
          );
        } else {
          models = [
            ActivityModel.forge({
              name: req.body.name,
              apd_id: apd.get('id')
            })
          ];
        }

        try {
          await Promise.all(models.map(async model => model.validate()));
        } catch (e) {
          return res
            .status(400)
            .send({ action: 'add-activity', error: e.message })
            .end();
        }

        await Promise.all(models.map(async model => model.save()));

        const allActivities = await ActivityModel.where({
          apd_id: apd.get('id')
        }).fetchAll();

        return res.send(allActivities.toJSON());
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
