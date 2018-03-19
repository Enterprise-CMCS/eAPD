const logger = require('../../../../logger')('apd activites route put');
const {
  apdActivity: defaultActivityModel,
  apdActivityExpense: defaultActivityExpenseModel,
  expense: defaultExpenseModel
} = require('../../../../db').models;
const { userCanEditAPD: defaultUserCanEditAPD } = require('../../utils');
const loggedIn = require('../../../../auth/middleware').loggedIn;

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ActivityExpenseModel = defaultActivityExpenseModel,
  ExpenseModal = defaultExpenseModel,
  userCanEditAPD = defaultUserCanEditAPD
) => {
  logger.silly('setting up PUT /activities/:id/expenses route');
  app.put('/activities/:id/expenses', loggedIn, async (req, res) => {
    logger.silly(req, 'handling PUT /activities/:id/expenses route');
    logger.silly(
      req,
      `attempting to update expenses on activity [${req.params.id}]`
    );

    try {
      const activityID = +req.params.id;
      const activity = await ActivityModel.where({ id: activityID }).fetch({
        withRelated: ['apd', 'expenses']
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
          .send({ error: 'edit-activity-invalid-expenses' })
          .end();
      }

      // Delete the previous expenses for this activity
      logger.silly('deleting previous expenses for this activity');
      activity.related('expenses').forEach(async expense => {
        await expense.destroy();
      });

      const expenseIds = (await ExpenseModal.fetchAll()).map(e => e.get('id'));
      const awaiting = req.body.map(async expense => {
        if (expenseIds.includes(expense.id)) {
          const expenseEntry = new ActivityExpenseModel({
            year: '2010',
            expense_id: expense.id,
            activity_id: activityID
          });
          await expenseEntry.save();
        }
      });

      await Promise.all(awaiting);

      const updatedActivity = await ActivityModel.where({
        id: activityID
      }).fetch({ withRelated: ['expenses'] });

      return res.send(updatedActivity.toJSON());
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
