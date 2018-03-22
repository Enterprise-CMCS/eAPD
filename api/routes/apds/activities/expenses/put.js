const logger = require('../../../../logger')('apd activites route put');
const {
  apdActivity: defaultActivityModel,
  apdActivityExpense: defaultActivityExpenseModel,
  apdActivityExpenseEntry: defaultActivityExpenseEntryModel
} = require('../../../../db').models;
const {
  loggedIn,
  loadActivity,
  userCanEditAPD
} = require('../../../../middleware');

module.exports = (
  app,
  ActivityModel = defaultActivityModel,
  ExpenseModel = defaultActivityExpenseModel,
  ExpenseEntryModal = defaultActivityExpenseEntryModel
) => {
  logger.silly('setting up PUT /activities/:id/expenses route');
  app.put(
    '/activities/:id/expenses',
    loggedIn,
    loadActivity(),
    userCanEditAPD(ActivityModel),
    async (req, res) => {
      logger.silly(req, 'handling PUT /activities/:id/expenses route');
      logger.silly(
        req,
        `attempting to update expenses on activity [${req.params.id}]`
      );

      try {
        if (!Array.isArray(req.body)) {
          logger.verbose('request is not an array');
          return res
            .status(400)
            .send({ error: 'edit-activity-invalid-expenses' })
            .end();
        }

        // Delete the previous expenses for this activity
        logger.silly('deleting previous expenses for this activity');
        const expensesToDelete = req.meta.activity
          .related('expenses')
          .map(async expense => {
            const entriesToDelete = expense
              .related('entries')
              .map(async entry => entry.destroy());
            await Promise.all(entriesToDelete);
            return expense.destroy();
          });
        await Promise.all(expensesToDelete);

        // Add expenses and entries for this activity
        const alsoAwaiting = [];
        const awaiting = req.body.map(async expense => {
          if (expense.name) {
            const expenseModel = ExpenseModel.forge({
              name: expense.name,
              activity_id: req.meta.activity.get('id')
            });
            await expenseModel.save();
            const expenseID = expenseModel.get('id');

            if (Array.isArray(expense.entries)) {
              expense.entries.forEach(async entry => {
                const entryModel = ExpenseEntryModal.forge({
                  year: entry.year,
                  amount: entry.amount,
                  description: entry.description,
                  expense_id: expenseID
                });
                alsoAwaiting.push(entryModel.save());
              });
            }
          }
        });

        await Promise.all(awaiting);
        await Promise.all(alsoAwaiting);

        const updatedActivity = await ActivityModel.where({
          id: req.meta.activity.get('id')
        }).fetch({
          withRelated: ['expenses.entries']
        });

        return res.send(updatedActivity.toJSON());
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
