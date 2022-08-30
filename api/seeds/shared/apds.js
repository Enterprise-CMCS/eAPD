const mongoose = require('mongoose');
const { setup, teardown } = require('../../db/mongodb');

const { data: apdData } = require(`../${process.env.NODE_ENV}/apds`); // eslint-disable-line import/no-dynamic-require

const logger = require('../../logger')('mongoose APD seeder');
const { APD } = require('../../models');

const models = [APD];

const emptyCollections = async () => {
  const collectionNames = Object.keys(mongoose.connection.collections);

  const dropPromises = models
    .map(model => {
      if (collectionNames.includes(model.collection.name)) {
        logger.verbose(`${model.collection.name} exists in the database`);
        return model.deleteMany();
      }
      logger.verbose(`${model.collection.name} does not exist in the database`);
      return null;
    })
    .filter(promise => promise !== null);

  try {
    return Promise.all(dropPromises);
  } catch (e) {
    if (e.code === 26) {
      // eslint-disable-next-line no-console
      console.log(`Error dropping: ${e.message}`);
    } else {
      throw e;
    }
    return false;
  }
};

const populate = async ({ model, data }) => {
  const count = await model.countDocuments().exec();
  await model.createIndexes();

  if (count === 0) {
    logger.verbose(
      `Seeding ${model.collection.name} with ${data.length} records`
    );
    await model.create(data);
  }
  logger.verbose(
    `Skipping ${model.collection.name} population, ${count} documents found`
  );
  return false;
};

// Connect to MongoDB via Mongoose
exports.seed = async () => {
  try {
    logger.verbose(`Connecting to MongoDB to seed data`);
    await setup();
    logger.verbose(
      `Emptying collections for ${models
        .map(model => model.collection.name)
        .join(', ')}`
    );
    await emptyCollections();
    logger.verbose('Populating collections');
    await populate({ model: APD, data: apdData });
    logger.verbose('Disconnecting from MongoDB');
    await teardown();
  } catch (err) {
    logger.error(`Error seeding: ${err}`);
  }
};

exports.drop = async () => {
  try {
    await setup();
    logger.verbose(
      `Emptying collections for ${models
        .map(model => model.collection.name)
        .join(', ')}`
    );
    await emptyCollections();
    logger.verbose('Disconnecting from MongoDB');
    await teardown();
  } catch (err) {
    logger.error(`Error seeding: ${err}`);
  }
};
