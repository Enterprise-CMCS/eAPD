const path = require('path');

// your app's webpack.config.js
const custom = require('../webpack.config.dev.js');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-queryparams',
    '@storybook/addon-jest',
    'storybook-addon-designs'
  ],
  webpackFinal: config => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...custom.module.rules,
          {
            // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
            //     the docs page from the markdown
            test: /\.(stories|story)\.mdx$/,
            use: [
              {
                loader: 'babel-loader',
                // may or may not need this line depending on your app's setup
                options: {
                  plugins: ['@babel/plugin-transform-react-jsx']
                }
              },
              {
                loader: '@mdx-js/loader',
                options: {
                  compilers: [createCompiler({})]
                }
              }
            ]
          },
          {
            test: /\.(stories|story)\.jsx?$/,
            loader: require.resolve('@storybook/source-loader'),
            exclude: [/node_modules/],
            enforce: 'pre'
          }
        ]
      }
    };
  }
};
