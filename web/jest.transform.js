'use strict';

const babelConfig = require('./.babelrc');

module.exports = require('babel-jest').default.createTransformer({
  ...babelConfig
});
