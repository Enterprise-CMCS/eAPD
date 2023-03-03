import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { MMIS } from '../models/index.js';

const logger = loggerFactory(
  'mongoose-migrate/migrate-results-of-previous-activities-mmis'
);

/**
 * Update Results of Previous Activities page in MMIS APDs to have DDI and M&O
 */
export const up = async () => {
  //Grab all APDs
  await setup();
  const apds = await MMIS.find().lean();
  logger.info(`Updating ${apds.length} APDs`);

  const updatedApds = apds.map(apd => {
    const years = apd.years;
    let prevYears = [];

    [0, 1, 2].map(past => prevYears.unshift(years[0] - past));

    if (apd.previousActivities.actualExpenditures[prevYears[0]].ddi) {
      return apd;
    }

    return {
      ...apd,
      id: apd._id,
      previousActivities: {
        ...apd.previousActivities,
        actualExpenditures: prevYears.reduce(
          (acc, year) => ({
            ...acc,
            [year]: {
              ddi: {
                50: {
                  federalActual: 0,
                  totalApproved: 0
                },
                75: {
                  federalActual: 0,
                  totalApproved: 0
                },
                90: {
                  federalActual: 0,
                  totalApproved: 0
                }
              },
              mando: {
                50: {
                  federalActual: 0,
                  totalApproved: 0
                },
                75: {
                  federalActual: 0,
                  totalApproved: 0
                }
              }
            }
          }),
          {}
        )
      }
    };
  });

  // Update them into the database
  await Promise.all(
    updatedApds.map(async apd => {
      logger.info(
        `Updating MMIS APD ${apd.id} to add ddi and mando to results of previous activities`
      );
      return MMIS.replaceOne({ _id: apd.id }, { ...apd });
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async () => {};
