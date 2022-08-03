const { teardown } = require('./db/mongodb');

teardown()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection closed');
    process.exit(0);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(`Error in MongoDB connection: ${err}`);
    process.exit(1);
  });
