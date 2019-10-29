const apd = require('./apd');
const auth = require('./auth');

module.exports = {
  ...apd,
  ...auth
};
