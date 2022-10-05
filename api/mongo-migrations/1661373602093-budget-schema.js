const logger = require('../logger')('migrate-mongoose/migrate-budget-schema');
const { calculateBudget, generateKey } = require('@cms-eapd/common');
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
      logger.info(`Creating budget for APD Id: ${apd._id}`);
      // need to add activityId to all activities
      apd.activities = apd.toJSON().activities.map(activity => ({
        ...activity,
        activityId: generateKey()
      }));
      const budget = await Budget.create(calculateBudget(apd.toJSON()));
      apd.budget = budget;
      await apd.save();
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  await setup();
  await Budget.deleteMany();
  const apds = await APD.find({});

  await Promise.all(
    apds.map(async apd => {
      delete apd.budget;
      await apd.save();
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
}

module.exports = { up, down };
