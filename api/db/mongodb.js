import mongoose from 'mongoose';
import loggerFactory from '../logger';

const logger = loggerFactory('mongoose');

const getConnectionString = () =>
  process.env.MONGO_URL ||
  'mongodb://mongo:cms@mongo:27017/eapd?authSource=admin';

const getDBName = () => process.env.MONGO_DATABASE || 'eapd';

export const connect = async () => {
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

export const setup = async () => {
  await connect();
  // eslint-disable-next-line global-require
  require('../models/index'); // import all of the mongo models
};

export const teardown = async () => {
  try {
    await mongoose.connection.close();
    logger.verbose('MongoDB disconnected');
  } catch (err) {
    logger.error(`Error disconnecting to MongoDB: ${err}`);
  }
};

export const getConnectionStatus = () => {
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
