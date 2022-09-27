const baseConfig = require('../.lintstagedrc.js');

module.exports = {
  ...baseConfig,
  '*.js': 'eslint --fix'
};
