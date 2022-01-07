const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    js: [path.join(__dirname, 'src/app.dev.js')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: {
          and: [/node_modules/], // Exclude libraries in node_modules ...
          not: [
            // Except for a few of them that needs to be transpiled because they use modern syntax
            /unfetch/,
            /d3-array|d3-scale|d3-format/,
            /@hapi[\\/]joi-date/
          ]
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults, ie >= 11' }]],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },

      // In dev, load our styles directly into the generated JS. That way
      // we got hot reloading on our Sass as well.
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource'
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: null,
      // Okta values have to be listed here so that they can be read
      // from within the app
      OKTA_DOMAIN: '',
      OKTA_SERVER_ID: '',
      OKTA_CLIENT_ID: ''
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html'
    })
  ],
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src/static'),
      publicPath: '/static/'
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: '8001'
  }
};

module.exports = config;
