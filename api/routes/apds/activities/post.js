const logger = require('../../../logger')('apd activites route post');
const {
  apdActivity: defaultActivityModel,
  apd: defaultApdModel
} = require('../../../db').models;
const { userCanEditAPD: defaultUserCanEditAPD } = require('../utils');
const loggedIn = require('../../../auth/middleware').loggedIn;

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

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ApdModel = defaultApdModel,
  userCanEditAPD = defaultUserCanEditAPD
) => {
  const getApd = async req => {
    const apdID = +req.params.apdID;

    if (!await userCanEditAPD(req.user.id, apdID)) {
      logger.verbose(req, 'user (state) not associated with this apd');
      return null;
    }

    const apd = await ApdModel.where({ id: apdID }).fetch({
      withRelated: ['activities']
    });
    if (!apd) {
      logger.verbose(req, `no such apd [${apdID}]`);
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
      const apd = await getApd(req, res);
      if (!apd) {
        return res.status(404).end();
      }

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
          apd.id,
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

      return res.send(allActivities);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
