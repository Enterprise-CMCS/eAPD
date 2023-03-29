import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { MMIS, Budget } from '../models/index.js';
import { BUDGET_TYPE, calculateBudget } from '@cms-eapd/common';

const logger = loggerFactory('mongoose-migrate/mmis-budget-match-rate');

/**
 * Update MMIS APD budgets to remove fields and add new fields (ddi and mando)
 */
export const up = async () => {
  // Grab all MMIS APDs
  await setup();
  const apds = await MMIS.find();

  logger.info(`Found ${apds.length} MMIS APDs`);

  await Promise.all(
    apds.map(async apd => {
      logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

      const budget = calculateBudget(apd);

      try {
        return Budget.replaceOne(
          { _id: apd.budget },
          { ...budget, __t: BUDGET_TYPE.MMIS_BUDGET }
        );
      } catch (err) {
        logger.error(err);
      }
    })
  ).catch(err => logger.error(err));

  await teardown();
};

export const down = async () => {};
