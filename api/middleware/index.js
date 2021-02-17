const apd = require('./apd');
const auth = require('./auth');
const hasRole = require('./hasRole');

module.exports = {
  ...apd,
  ...auth,
  hasRole
};
