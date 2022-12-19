const logger = require('../logger')(
  'mongoose-migrate/migrate-key-state-personnel-mmis'
);
const { setup, teardown } = require('../db/mongodb');
const { APD } = require('../models');

/**
 * Update HITECH APDs to have a default 90-10 split for key state personnel
 */
async function up() {
  // Grab all APDs
  await setup();
  const apds = await APD.find({}).lean();

  // Create new object with updated keyPersonnel.split
  const updatedApds = apds
    .filter(apd => apd.__t === 'HITECH')
    .map(apd => {
      const years = apd.years;

      return {
        ...apd,
        id: apd._id,
        keyStatePersonnel: {
          ...apd.keyStatePersonnel,
          keyPersonnel: apd.keyStatePersonnel.keyPersonnel.map(
            keyPersonnel => ({
              ...keyPersonnel,
              split: years.reduce(
                /**
                 * Iterate over each year and return an object with the year as the key
                 * So if years is ['2022', '2023'] the resulting object will look like this:
                 * {
                 *   '2022': { federal: 90, state: 10 }
                 *   '2023': { federal: 90, state: 10 }
                 * }
                 */
                (acc, year) => ({ ...acc, [year]: { federal: 90, state: 10 } }),
                {}
              )
            })
          )
        }
      };
    });

  // Update them into the database
  await Promise.all(
    updatedApds.map(async apd => {
      await APD.replaceOne({ _id: apd.id }, { ...apd });
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
