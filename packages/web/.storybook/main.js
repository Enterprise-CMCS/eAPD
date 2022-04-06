// your app's webpack.config.js
const custom = require('../webpack.config.dev.js');

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.story.@(mdx|js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-queryparams',
    '@storybook/addon-jest',
    'storybook-addon-designs'
  ],
  staticDirs: [{ from: '../src/static', to: '/static' }],
  webpackFinal: config => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'shared'],
        alias: {
          ...config.resolve.alias,
          path: require.resolve('path-browserify'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify')
        },
        fallback: {
          fs: false,
          tls: false,
          net: false,
          path: false,
          zlib: false,
          http: false,
          https: false,
          stream: false,
          crypto: false
        }
      },
      module: {
        ...config.module,
        rules: [...config.module.rules, ...custom.module.rules]
      }
    };
  }
};
