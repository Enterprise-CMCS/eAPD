const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

const getConnectionString = () =>
  process.env.MONGO_URL ||
  'mongodb://mongo:cms@mongo:27017/eapd?authSource=admin';

const getDBName = () => process.env.MONGO_DATABASE || 'eapd';

const connect = async () => {
  logger.verbose('Setting up MongoDB connection');
  const connectionString = getConnectionString();
  const dbName = getDBName();

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
      keepAlive: true,
      keepAliveInitialDelay: 300000
    });
    logger.verbose('MongoDB connected');
    return null;
  } catch (err) {
    logger.error(`Error in MongoDB connection: ${err}`);
    return false;
  }
};

const setup = async () => {
  await connect();
  // eslint-disable-next-line global-require
  require('../models/index'); // import all of the mongo models
};

const teardown = async () => {
  try {
    await mongoose.connection.close();
    logger.verbose('MongoDB disconnected');
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
