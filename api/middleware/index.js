const apd = require('./apd');
const auth = require('./auth');
const sync = require('./synchronize');

module.exports = {
  ...apd,
  ...auth,
  ...sync
};
