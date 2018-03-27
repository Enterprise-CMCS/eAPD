const logger = require('../../../logger')('apd activites route post');
const { apdActivity: defaultActivityModel } = require('../../../db').models;
const { loggedIn, userCanEditAPD } = require('../../../middleware');

const syncActivitiesListWithDB = async (
  newActivities,
  existingActivities,
  apdID,
  ActivityModel
) => {
  const saving = [];
  existingActivities.forEach(existing => {
    const newInfo = newActivities.find(a => a.id === existing.get('id'));
    if (newInfo) {
      existing.set({ name: newInfo.name });
      saving.push(existing.save());
    }
  });

  newActivities
    .filter(a => typeof a.id === 'undefined')
    .forEach(newActivity => {
      const activity = ActivityModel.forge({
        name: newActivity.name,
        apd_id: apdID
      });
      saving.push(activity.save());
    });

  return Promise.all(saving);
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

        let names = [req.body.name];
        if (Array.isArray(req.body)) {
          names = req.body.map(activity => activity.name);
        }

        if (names.some(name => typeof name !== 'string' || name.length < 1)) {
          logger.verbose(req, 'Invalid activity name');
          return res
            .status(400)
            .send({ error: 'add-activity-invalid-name' })
            .end();
        }

        const existingActivities = apd.related('activities');

        if (Array.isArray(req.body)) {
          await syncActivitiesListWithDB(
            req.body,
            existingActivities,
            apd.get('id'),
            ActivityModel
          );
        } else {
          const existingNames = existingActivities.pluck(['name']);
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
        }

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
