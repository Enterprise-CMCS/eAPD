const defaultConfigs = require('../babel.config');

module.exports = {
  ...defaultConfigs,
  env: {
    test: {
      plugins: ['istanbul']
    }
  }
};
