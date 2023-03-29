import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { MMIS } from '../models/index.js';

const logger = loggerFactory(
  'mongoose-migrate/migrate-activities-funding-source-mmis'
);

/**
 * Update MMIS APDs to have a funding source in each activity
 */
export const up = async () => {
  // Grab APDs
  await setup();
  const apds = await MMIS.find({
    activities: {
      $elemMatch: {
        fundingSource: { $exists: false }
      }
    }
  }).lean();
  logger.info(`Updating ${apds.length} APDs`);

  // Create new object with updated activities
  const updatedApds = apds.map(apd => {
    return {
      ...apd,
      id: apd._id,
      activities: apd.activities.map(activity => ({
        ...activity,
        fundingSource: 'MMIS'
      }))
    };
  });

  // Update them into the database
  await Promise.all(
    updatedApds.map(async apd => {
      logger.info(
        `Updating MMIS APD ${apd.id} to add fundingSource to all activities`
      );
      return MMIS.replaceOne({ _id: apd.id }, { ...apd });
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
};

/**
 * Update MMIS APDs to remove funding source in each activity
 */
export const down = async () => {
  // we are not planning on returning to not having fundingSource in MMIS activities
};
