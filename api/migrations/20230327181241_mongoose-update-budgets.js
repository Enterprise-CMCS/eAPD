import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD, Budget, HITECH, MMIS } from '../models/index.js';
import { BUDGET_TYPE, calculateBudget } from '@cms-eapd/common';

const logger = loggerFactory('mongoose-migrate/updating-budgets');

/**
 * Update the existing database to match the new model
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async () => {
  // Grab all APDs
  await setup();

  // Update HITECH Budgets
  // { virtuals: true } returns apdType along with __t
  const hitech = await HITECH.find().lean({ virtuals: true });
  logger.info(`Update ${hitech.length} HITECH Budgets`);

  const hitechResults = await Promise.allSettled(
    hitech.map(apd => {
      logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

      const budget = calculateBudget({ ...apd });
      return Budget.replaceOne(
        { _id: apd.budget },
        { ...budget, __t: BUDGET_TYPE.HITECH_BUDGET },
        {
          multipleCastError: true,
          runValidators: false,
          upsert: true
        }
      );
    })
  );
  logger.info(`HITECH results: ${JSON.stringify(hitechResults)}`);

  // Update MMIS Budgets
  // { virtuals: true } returns apdType along with __t
  const mmis = await MMIS.find().lean({ virtuals: true });
  logger.info(`Update ${mmis.length} MMIS Budgets`);

  const mmisResults = await Promise.allSettled(
    mmis.map(apd => {
      logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

      const budget = calculateBudget({ ...apd });
      return Budget.replaceOne(
        { _id: apd.budget },
        { ...budget, __t: BUDGET_TYPE.MMIS_BUDGET },
        {
          multipleCastError: true,
          runValidators: false,
          upsert: true
        }
      );
    })
  );
  logger.info(`MMIS results: ${JSON.stringify(mmisResults)}`);

  const apds = await APD.find({ __t: null }).lean();
  logger.info(`Found ${apds.length} plain APDs`);

  await teardown();
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async () => {};
