const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

const setup = async () => {
  // Set up default mongoose connection
  logger.verbose('Setting up MongoDB connection');
  try {
    const db = mongoose.connection;
    // setting up listeners for MongoDB
    db.on('error', err => logger.error(`Error in MongoDB connection: ${err}`));
    db.on('connected', () => {
      logger.verbose('MongoDB connected');
      require('../models'); // eslint-disable-line global-require
    });
    db.once('open', () => logger.verbose('MongoDB connection open'));
    db.on('disconnected', () => logger.verbose('MongoDB disconnected!'));

    const connectionString =
      process.env.MONGO_URL || 'mongodb://mongo:cms@mongo:27017/eapd';
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return db;
  } catch (e) {
    logger.error(`Error connecting to MongoDB: ${e}`);
    return null;
  }
};

module.exports = { setup };
