import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import {
  APD,
  HITECH,
  HITECHBudget,
  MMIS,
  MMISBudget
} from '../models/index.js';
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

  // Update HITECH Budgets
  // { virtuals: true } returns apdType along with __t
  const hitech = await HITECH.find().lean({ virtuals: true });
  logger.info(`Update ${hitech.length} HITECH Budgets`);

  const hitechResults = await Promise.allSettled(
    hitech.map(apd => {
      logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

      const budget = calculateBudget({ ...apd });
      return HITECHBudget.replaceOne(
        { _id: apd.budget },
        { ...budget },
        {
          multipleCastError: true
        }
      );
    })
  );
  logger.info(`HITECH results: ${JSON.stringify(hitechResults, null, 2)}`);

  // Update MMIS Budgets
  // { virtuals: true } returns apdType along with __t
  const mmis = await MMIS.find().lean({ virtuals: true });
  logger.info(`Update ${mmis.length} MMIS Budgets`);

  const mmisResults = await Promise.allSettled(
    mmis.map(apd => {
      logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

      const budget = calculateBudget({ ...apd });
      return MMISBudget.replaceOne(
        { _id: apd.budget },
        { ...budget },
        {
          multipleCastError: true
        }
      );
    })
  );
  logger.info(`MMIS results: ${JSON.stringify(mmisResults, null, 2)}`);

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
