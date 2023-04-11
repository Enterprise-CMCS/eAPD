import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { MMIS, MMISBudget, Budget } from '../models/index.js';
import { calculateBudget, BUDGET_TYPE } from '@cms-eapd/common';

const logger = loggerFactory(
  'mongoose-migrate/add-key-state-personnel-ddi-mando'
);

/**
 * Re-run MMIS APD budgets to add key state personnel to ddi and mando
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
          { ...budget, __t: BUDGET_TYPE['MMIS'] }
        );
      } catch (err) {
        logger.error(err);
      }
    })
  ).catch(err => logger.error(err));

  await teardown();
};

export const down = async () => {};
