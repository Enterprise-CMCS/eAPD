const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

const setup = () =>
  new Promise((resolve, reject) => {
    logger.verbose('Setting up MongoDB connection');
    const connectionString =
      process.env.MONGO_URL || 'mongodb://mongo:cms@mongodb:27017/eapd';
    const dbName =
      process.env.MONGO_DATABASE || connectionString.split('/').pop();
    return mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName,
        authSource: dbName
      })
      .then(() => {
        logger.verbose('MongoDB connected');
        require('../models'); // eslint-disable-line global-require
        logger.verbose('loaded models');
        resolve(mongoose.connection);
      })
      .catch(err => {
        logger.error(`Error in MongoDB connection: ${err}`);
        reject(err);
      });
  });

const teardown = () =>
  new Promise((resolve, reject) => {
    mongoose.connection
      .close()
      .then(resolve)
      .catch(e => {
        logger.error(`Error disconnecting to MongoDB: ${e}`);
        reject(e);
      });
  });

module.exports = { setup, teardown };
