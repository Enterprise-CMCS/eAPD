import { calculateBudget, generateKey } from '@cms-eapd/common';
import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD, Budget } from '../models/index.js';

const logger = loggerFactory('migrate-mongoose/migrate-budget-schema');

const forAllYears = (currentObj, defaultObj, yearsToCover) =>
  yearsToCover.reduce(
    (acc, year) => ({
      ...acc,
      [year]: currentObj?.[year] || defaultObj
    }),
    {}
  );

export const up = async () => {
  // Grab all APDs
  await setup();
  const apds = await APD.find();

  await Promise.all(
    apds.map(async apd => {
      logger.info(`Creating budget for APD Id: ${apd._id}`);
      // need to add activityId to all activities
      apd.activities = apd.toJSON().activities.map(activity => ({
        ...activity,
        activityId: generateKey(),
        costAllocationNarrative: {
          methodology: activity.costAllocationNarrative.methodology,
          years: forAllYears(
            activity.costAllocationNarrative.years,
            { otherSources: '' },
            apd.years
          )
        }
      }));
      try {
        return Budget.create(calculateBudget(apd.toJSON())).then(budget => {
          apd.budget = budget;
          return apd.save();
        });
      } catch (err) {
        logger.error(err);
      }
    })
  ).catch(err => {
    logger.error(err);
  });

  await teardown();
};

export const down = async () => {
  // We do not plan on returning to this previous format for the APD
  // but we can remove the budget
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
};
