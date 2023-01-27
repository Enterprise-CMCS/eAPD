const logger = require('../logger/index.js')(
  'mongoose-migrate/migrate-key-state-personnel-mmis'
);
const { setup, teardown } = require('../db/mongodb.js');
const { HITECH } = require('../models/index.js');

/**
 * Update HITECH APDs to have a default 90-10 split for key state personnel
 */
async function up() {
  // Grab all APDs
  await setup();
  const apds = await HITECH.find().lean();

  // Create new object with updated keyPersonnel.split
  const updatedApds = apds.map(apd => {
    const years = apd.years;

    return {
      ...apd,
      id: apd._id,
      keyStatePersonnel: {
        ...apd.keyStatePersonnel,
        keyPersonnel: apd.keyStatePersonnel.keyPersonnel.map(keyPersonnel => ({
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
            (acc, year) => ({ ...acc, [year]: { federal: 90, state: 10 } }),
            {}
          ),
          medicaidShare: years.reduce(
            /**
             * Similar to above, set existing HITECH APDs to have a Medicaid share of 100%
             * So if years is ['2022', '2023'] the resulting object will look like this:
             * {
             *   '2022': 100
             *   '2023': 100
             * }
             */
            (acc, year) => ({ ...acc, [year]: 100 }),
            {}
          )
        }))
      }
    };
  });

  // Update them into the database
  await Promise.all(
    updatedApds.map(async apd => {
      logger.info(`Updating HITECH APD ${apd.id} to add split`);
      await HITECH.replaceOne({ _id: apd.id }, { ...apd });
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {}

module.exports = { up, down };
