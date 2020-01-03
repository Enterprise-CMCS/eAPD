const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

if (!process.env.IDLE_LOGOUT_TIME_MINUTES) {
  delete process.env.IDLE_LOGOUT_TIME_MINUTES;
}

const config = {
  mode: 'production',
  entry: {
    app: [
      path.join(__dirname, 'src/app.js'),
      path.join(__dirname, 'src/styles/index.scss')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),

    // Bust the cache with a hash!
    filename: '[name].[contenthash].js'
  },
  optimization: {
    // By default, grabs everything in node_modules and puts it into a
    // vendored chunk.
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'app.css' }
          },
          'extract-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules')]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/fonts'
            }
          }
        ]
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  },
  // replaces "process.env.____" with the values defined in the actual
  // environment at build time
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: null,
      IDLE_LOGOUT_TIME_MINUTES: 15
    }),

    // uses module hashs as IDs instead of numeric indices, so adding a new
    // file to the app doesn't cause vendored output hash to change
    new webpack.HashedModuleIdsPlugin(),

    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html'
    }),
    new HtmlWebpackTagsPlugin({
      tags: ['app.css'],
      append: true,
      hash: true
    })
  ]
};

module.exports = config;
