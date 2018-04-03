const logger = require('../../../../logger')(
  'apd activity schedule route post'
);
const {
  apdActivity: defaultActivityModel,
  apdActivitySchedule: defaultActivitySchedule
} = require('../../../../db').models;
const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../../middleware');

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ScheduleModel = defaultActivitySchedule
) => {
  const route = '/activities/:id/schedule';
  logger.silly(`setting up PUT ${route} route`);
  app.put(
    route,
    loggedIn,
    loadActivity(),
    userCanEditAPD(ActivityModel),
    async (req, res) => {
      logger.silly(req, `handling PUT ${route} route`);
      logger.silly(
        req,
        `attempting to set schedule on apd activity [${req.params.id}]`
      );

      try {
        const activityID = +req.params.id;
        const activity = req.meta.activity;

        if (!Array.isArray(req.body)) {
          logger.verbose('request is not an array');
          return res
            .status(400)
            .send({ error: 'edit-activity-invalid-schedule' })
            .end();
        }

        // Delete the previous schedule for this activity
        logger.silly('deleting previous activity schedule');
        await Promise.all(
          activity.related('schedule').map(async schedule => schedule.destroy())
        );

        await Promise.all(
          req.body.map(async ({ milestone, status }) => {
            // don't insert empty objects, that's silly
            if (milestone || status) {
              const schedule = ScheduleModel.forge({
                milestone,
                status,
                activity_id: activityID
              });
              await schedule.save();
            }
          })
        );

        const updatedActivity = await ActivityModel.where({
          id: activityID
        }).fetch({
          withRelated: ActivityModel.withRelated
        });

        return res.send(updatedActivity.toJSON());
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
