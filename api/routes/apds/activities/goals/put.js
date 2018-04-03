const logger = require('../../../../logger')('apd activites route put');
const {
  apdActivity: defaultActivityModel,
  apdActivityGoal: defaultGoalModel,
  apdActivityGoalObjective: defaultObjectiveModel
} = require('../../../../db').models;
const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../../middleware');

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  GoalModel = defaultGoalModel,
  ObjectiveModel = defaultObjectiveModel
) => {
  logger.silly('setting up PUT /activities/:id/goals route');
  app.put(
    '/activities/:id/goals',
    loggedIn,
    loadActivity(),
    userCanEditAPD(ActivityModel),
    async (req, res) => {
      logger.silly(req, 'handling PUT /activities/:id/goals route');
      logger.silly(
        req,
        `attempting to update goals on activity [${req.params.id}]`
      );

      try {
        const activity = req.meta.activity;

        if (!Array.isArray(req.body)) {
          logger.verbose('request is not an array');
          return res
            .status(400)
            .send({ error: 'edit-activity-invalid-goals' })
            .end();
        }

        // Delete the previous goals and objectives for this activity
        logger.silly(
          'deleting previous goals and objectives for this activity'
        );
        const awaitingGoals = activity.related('goals').map(async goal => {
          const awaitingObjectives = goal
            .related('objectives')
            .map(async objective => objective.destroy());
          await Promise.all(awaitingObjectives);
          return goal.destroy();
        });
        await Promise.all(awaitingGoals);

        const alsoAwaiting = [];
        const awaiting = req.body.map(async goal => {
          if (goal.description) {
            const goalModel = GoalModel.forge({
              description: goal.description,
              activity_id: activity.get('id')
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
                  alsoAwaiting.push(objectiveModel.save());
                }
              });
            }
          }
        });

        await Promise.all(awaiting);
        await Promise.all(alsoAwaiting);

        const updatedActivity = await ActivityModel.where({
          id: activity.get('id')
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
