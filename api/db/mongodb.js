const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');

// setting up listeners for MongoDB
mongoose.connection.on('error', err =>
  logger.error(`Error in MongoDB connection: ${err}`)
);
mongoose.connection.on('connected', () => logger.info('MongoDB connected'));
mongoose.connection.on('disconnected', () =>
  logger.verbose('MongoDB disconnected!')
);

// Set up default mongoose connection
logger.info('Setting up MongoDB connection');
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
