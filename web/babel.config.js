module.exports = {
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults, ie >= 11'
      }
    ],
    '@babel/preset-react'
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime', 'transform-require-context']
    }
  }
};
