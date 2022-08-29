const { setup, teardown } = require('../../db/mongodb');

const { data: apdData } = require(`../${process.env.NODE_ENV}/apds`); // eslint-disable-line import/no-dynamic-require

const logger = require('../../logger')('mongoose APD seeder');
const { APD, Budget } = require('../../models/index');

const models = [APD, Budget];

const dropCollections = async () => {
  const dropPromises = models.map(model => model.collection.drop());

  try {
    await Promise.all(dropPromises);
  } catch (e) {
    if (e.code === 26) {
      // eslint-disable-next-line no-console
      console.log(`Error dropping: ${e.message}`);
    } else {
      throw e;
    }
  }
};

const populate = async ({ model, data }) => {
  const count = await model.countDocuments().exec();

  if (count === 0) {
    logger.verbose(
      `Seeding ${model.collection.name} with ${data.length} records`
    );
    return model.create(data);
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
      `Dropping collections for ${models
        .map(model => model.collection.name)
        .join(', ')}`
    );
    await dropCollections();
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
      `Dropping collections for ${models
        .map(model => model.collection.name)
        .join(', ')}`
    );
    await dropCollections();
    logger.verbose('Disconnecting from MongoDB');
    await teardown();
  } catch (err) {
    logger.error(`Error seeding: ${err}`);
  }
};
