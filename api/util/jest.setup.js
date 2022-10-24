const { setup } = require('./db/mongodb');

module.exports = async () => {
  await setup();
};
