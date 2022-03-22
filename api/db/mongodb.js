require('../models'); // import all of the mongo models

const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

const setup = () =>
  new Promise((resolve, reject) => {
    logger.verbose('Setting up MongoDB connection');
    const connectionString =
      process.env.MONGO_URL ||
      'mongodb://mongo:cms@mongo:27017/eapd?authSource=admin';
    const dbName = process.env.MONGO_DATABASE || 'eapd';

    mongoose.connection.on('connected', () => {
      logger.verbose('MongoDB connected');
      resolve();
    });

    try {
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName
      });
    } catch (err) {
      logger.error(`Error in MongoDB connection: ${err}`);
      logger.error(`Full error: ${JSON.stringify(err)}`);
      reject(err);
    }
  });

const teardown = () =>
  new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      logger.verbose('MongoDB disconnected');
      resolve();
    });

    try {
      mongoose.connection.close().then(resolve);
    } catch (err) {
      logger.error(`Error disconnecting to MongoDB: ${err}`);
      reject(err);
    }
  });

const getConnectionStatus = () => {
  const status = mongoose.connection.readyState;
  if (status === 0) {
    return 'disconnected';
  }
  if (status === 1) {
    return 'connected';
  }
  if (status === 2) {
    return 'connecting';
  }
  if (status === 3) {
    return 'disconnecting';
  }
  return 'unknown';
};

module.exports = { setup, teardown, getConnectionStatus };
