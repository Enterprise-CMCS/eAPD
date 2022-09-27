const baseConfig = require('../.lintstagedrc.js');

module.exports = {
  ...baseConfig,
  '*.js': ['prettier --write --config "../.prettierrc"', 'eslint']
};
