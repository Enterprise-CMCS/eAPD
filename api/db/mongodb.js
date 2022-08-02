const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

const connect = async () => {
  logger.verbose('Setting up MongoDB connection');
  const connectionString =
    process.env.MONGO_URL ||
    'mongodb://mongo:cms@mongo:27017/eapd?authSource=admin';
  const dbName = process.env.MONGO_DATABASE || 'eapd';

  try {
    await mongoose
      .connect(connectionString, {
        dbName,
        keepAlive: true,
        keepAliveInitialDelay: 300000
      })
      .then(() => {
        logger.verbose('MongoDB connected');
      })
      .catch(err => {
        logger.error(`Error in MongoDB connection: ${err}`);
      });
  } catch (err) {
    logger.error(`Error in MongoDB connection: ${err}`);
  }
};

const setup = async () => {
  await connect();
  require('../models'); // import all of the mongo models
};

const teardown = async () => {
  try {
    await mongoose.connection
      .close()
      .then(() => {
        logger.verbose('MongoDB disconnected');
      })
      .catch(err => {
        logger.error(`Error disconnecting to MongoDB: ${err}`);
      });
  } catch (err) {
    logger.error(`Error disconnecting to MongoDB: ${err}`);
  }
};

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

module.exports = { connect, setup, teardown, getConnectionStatus };
