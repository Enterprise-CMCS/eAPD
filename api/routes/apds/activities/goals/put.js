const logger = require('../../../../logger')('apd activites route put');
const {
  apdActivity: defaultActivityModel,
  apdActivityGoal: defaultGoalModel,
  apdActivityGoalObjective: defaultObjectiveModel
} = require('../../../../db').models;
const { userCanEditAPD } = require('../../utils');
const loggedIn = require('../../../../auth/middleware').loggedIn;

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  GoalModel = defaultGoalModel,
  ObjectiveModel = defaultObjectiveModel
) => {
  logger.silly('setting up PUT /activities/:id/goals route');
  app.put('/activities/:id/goals', loggedIn, async (req, res) => {
    logger.silly(req, 'handling PUT /activities/:id/goals route');
    logger.silly(
      req,
      `attempting to update goals on activity [${req.params.id}]`
    );

    try {
      const activityID = +req.params.id;
      const activity = await ActivityModel.where({ id: activityID }).fetch({
        withRelated: ['apd', 'goals.objectives']
      });
      if (!activity) {
        logger.verbose(req, 'activity not found');
        return res.status(404).end();
      }
      const apdID = activity.related('apd').get('id');

      if (!userCanEditAPD(req.user.id, apdID)) {
        logger.verbose(
          req,
          'user (state) not associated with the apd this activity belongs to'
        );
        return res.status(404).end();
      }

      if (!Array.isArray(req.body)) {
        logger.verbose('request is not an array');
        return res
          .status(400)
          .send({ error: 'edit-activity-invalid-goals' })
          .end();
      }

      // Delete the previous goals and objectives for this activity
      logger.silly('deleting previous goals and objectives for this activity');
      activity.related('goals').forEach(async goal => {
        goal.related('objectives').forEach(async objective => {
          await objective.destroy();
        });
        await goal.destroy();
      });

      const awaiting = req.body.map(async goal => {
        if (goal.description) {
          const goalModel = GoalModel.forge({
            description: goal.description,
            activity_id: activityID
          });
          await goalModel.save();
          const goalID = goalModel.get('id');

          if (Array.isArray(goal.objectives)) {
            goal.objectives.forEach(async objective => {
              if (typeof objective === 'string' && objective) {
                const objectiveModel = ObjectiveModel.forge({
                  description: objective,
                  activity_goal_id: goalID
                });
                await objectiveModel.save();
              }
            });
          }
        }
      });

      await Promise.all(awaiting);

      const updatedActivity = await ActivityModel.where({
        id: activityID
      }).fetch({
        withRelated: ['goals.objectives']
      });

      return res.send(updatedActivity.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
