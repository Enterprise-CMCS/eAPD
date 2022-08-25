const logger = require('../logger')('migrate-mongoose/migrate-budget-schema');
const { calculateBudget } = require('@cms-eapd/common');
const { setup, teardown } = require('../db/mongodb');
const { APD, Budget } = require('../models');

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Grab all APDs
  await setup();
  const apds = await APD.find({});

  await Promise.all(
    apds.map(async apd => {
      logger.info(
        `APD id: ${apd._id}, status: ${apd.status}, stateId: ${apd.stateId}, years: ${apd.years}`
      );
      console.log(`APD ${JSON.stringify(apd.toObject(), null, 2)}`);
      const budgetData = calculateBudget(apd.toObject());
      console.log(`budgetData: ${JSON.stringify(budgetData, null, 2)}`);

      const budget = new Budget({
        apdId: apd._id,
        status: apd.status,
        stateId: apd.stateId,
        years: [...apd.years],
        ...budgetData
      });
      console.log(`budget ${JSON.stringify(budget, null, 2)}`);
      apd.budget = budget;

      await apd.save();
      await budget.save();
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {}

module.exports = { up, down };
