import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD, getBudgetModel } from '../models/index.js';
import { calculateBudget } from '@cms-eapd/common';

const logger = loggerFactory('mongoose-migrate/updating-budgets');

/**
 * Update the existing database to match the new model
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async () => {
  // Grab all APDs
  await setup();
  // { virtuals: true } returns apdType along with __t
  const apds = await APD.find().lean({ virtuals: true });

  logger.info(`Update ${apds.length} Budgets`);

  await Promise.all(
    apds.map(apd => {
      logger.info(
        `Updating APD ${apd._id}, a ${apd.apdType} type, Budget ${apd.budget}`
      );

      const apdType = apd.__t;
      const budget = calculateBudget({
        ...apd,
        apdType
      });
      return getBudgetModel(apdType).replaceOne(
        { _id: apd.budget },
        { ...budget }
      );
    })
  ).catch(err => logger.error(err));

  await teardown();
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async () => {};
