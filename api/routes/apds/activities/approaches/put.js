const logger = require('../../../../logger')(
  'apd activity approaches route post'
);
const {
  apdActivity: defaultActivityModel,
  apdActivityApproach: defaultApproachModel
} = require('../../../../db').models;
const { userCanEditAPD: defaultUserCanEditAPD } = require('../../utils');
const loggedIn = require('../../../../auth/middleware').loggedIn;

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ApproachModel = defaultApproachModel,
  userCanEditAPD = defaultUserCanEditAPD
) => {
  const route = '/activities/:id/approaches';
  logger.silly(`setting up PUT ${route} route`);
  app.put(route, loggedIn, async (req, res) => {
    logger.silly(req, `handling PUT ${route} route`);
    logger.silly(
      req,
      `attempting to set approaches on apd activity [${req.params.id}]`
    );

    try {
      const activityID = +req.params.id;
      const activity = await ActivityModel.where({ id: activityID }).fetch({
        withRelated: ['apd', 'approaches']
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

      if (!Array.isArray(req.body)) {
        logger.verbose('request is not an array');
        return res
          .status(400)
          .send({ error: 'edit-activity-invalid-approaches' })
          .end();
      }

      // Delete the previous approaches for this activity
      logger.silly('deleting previous approaches activity');
      await Promise.all(
        activity.related('approaches').map(async approach => approach.destroy())
      );

      await Promise.all(
        req.body.map(async ({ description, alternatives, explanation }) => {
          const approach = ApproachModel.forge({
            description,
            alternatives,
            explanation,
            activity_id: activityID
          });
          await approach.save();
        })
      );

      return res.status(200).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
