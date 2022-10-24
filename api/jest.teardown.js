const { teardown } = require('./db/mongodb');

module.exports = async () => {
  await teardown();
};
