'use strict';

const babelConfig = require('./.babelrc');

module.exports = require('babel-jest').default.createTransformer({
  ...babelConfig,
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime', 'transform-require-context']
    }
  }
});
