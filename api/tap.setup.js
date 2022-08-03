const { setup } = require('./db/mongodb');

// eslint-disable-next-line no-console
console.log('Initializing MongoDB connection');
setup()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected');
    process.exit(0);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(`Error in MongoDB connection: ${err}`);
    process.exit(1);
  });
