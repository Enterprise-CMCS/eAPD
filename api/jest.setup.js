const { setup, init } = require('./db/mongodb');

module.exports = async () => {
  console.log('initializing MongoDB connection');
  try {
    await setup();
    await init();
    return 0;
  } catch (err) {
    return 1;
  }
};
