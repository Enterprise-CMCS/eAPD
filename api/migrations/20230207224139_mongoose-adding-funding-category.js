import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD, Budget } from '../models/index.js';
import {
  APD_TYPE,
  BUDGET_TYPE,
  FUNDING_CATEGORY_TYPE,
  calculateBudget,
  deepCopy
} from '@cms-eapd/common';

const logger = loggerFactory(
  'mongoose-migrate/migrate-adding-funding-category'
);

const updateFundingCategory = ({ federal = null, state = null } = {}) => {
  if (federal === 90 && state === 10) {
    return FUNDING_CATEGORY_TYPE.DDI;
  }
  if (federal === 75 && state === 25) {
    return FUNDING_CATEGORY_TYPE.MANDO;
  }
  return null;
};

/**
 * Update APDs to have a fundingCategory field in costAllocation.
 * HITECH APDs keep their existing ffp split and have a null fundingCategory.
 * MMIS APDs have their ffp split reset and have a null fundingCategory.
 */
export const up = async () => {
  // Grab all APDs
  await setup();
  // { virtuals: true } returns apdType along with __t
  const apds = await APD.find().lean({ virtuals: true });
  logger.info(`Updating ${apds.length} APDs`);

  const updatedApds = [];

  apds.forEach(apd => {
    const apdJSON = deepCopy(apd);
    const years = apd.years;
    const apdType = apd.__t;

    let updated = false;

    apdJSON.keyStatePersonnel.keyPersonnel =
      apdJSON.keyStatePersonnel.keyPersonnel.map(keyPersonnel => {
        if (keyPersonnel?.split?.[years[0]]?.fundingCategory === undefined) {
          updated = true;
          return {
            ...keyPersonnel,
            split: years.reduce(
              /**
               * Iterate over each year and return an object with the year as the key and
               * set the default for existing HITECH APDs to a 90/10 split.
               * If years is ['2022', '2023'] the resulting object will look like this:
               * {
               *   '2022': { federal: 90, state: 10 }
               *   '2023': { federal: 90, state: 10 }
               * }
               */
              (acc, year) => ({
                ...acc,
                [year]: {
                  ...keyPersonnel?.split?.[year],
                  fundingCategory: updateFundingCategory(
                    keyPersonnel?.split?.[year]
                  )
                }
              }),
              {}
            )
          };
        }
        return keyPersonnel;
      });

    apdJSON.activities = apdJSON.activities.map(activity => {
      if (
        activity?.costAllocation?.[years[0]]?.ffp?.fundingCategory === undefined
      ) {
        updated = true;
        return {
          ...activity,
          costAllocation: years.reduce(
            (acc, year) => ({
              ...acc,
              [year]: {
                ffp: {
                  federal:
                    apdType === APD_TYPE.HITECH
                      ? activity?.costAllocation?.[year]?.ffp?.federal
                      : 0,
                  state:
                    apdType === APD_TYPE.HITECH
                      ? activity?.costAllocation?.[year]?.ffp?.state
                      : 0,
                  fundingCategory: null
                },
                other:
                  apdType === APD_TYPE.HITECH
                    ? activity?.costAllocation?.[year]?.other
                    : 0
              }
            }),
            {}
          )
        };
      }
      return activity;
    });

    if (updated) {
      logger.info(`APD ${apdJSON._id} needs to be updated`);
      updatedApds.push(apdJSON);
    }
  });

  if (updatedApds.length > 0) {
    await Promise.all(
      updatedApds.map(apd => {
        logger.info(`Updating APD ${apd._id} to add funding category`);
        return APD.replaceOne({ _id: apd._id }, { ...apd, __t: apd.__t });
      })
    ).catch(err => logger.error(err));
    await Promise.all(
      updatedApds.map(apd => {
        logger.info(`Updating APD ${apd._id} Budget ${apd.budget}`);

        const apdType = apd.__t;
        const budget = calculateBudget({
          ...apd,
          apdType
        });
        return Budget.replaceOne(
          { _id: apd.budget },
          { ...budget, __t: BUDGET_TYPE[apdType] }
        );
      })
    ).catch(err => logger.error(err));
  } else {
    logger.info('Nothing to update');
  }
  await teardown();
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export const down = async () => {};
