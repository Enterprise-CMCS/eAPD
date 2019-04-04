const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const config = {
  mode: 'development',
  entry: {
    js: [
      path.join(__dirname, 'src/app.dev.js'),
      path.join(__dirname, 'src/styles/legacy.css'),
      path.join(__dirname, 'src/styles/index.scss')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // In dev, load our styles directly into the generated JS. That way
      // we got hot reloading on our CSS and Sass as well.

      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: 'inline' }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { includePaths: [path.resolve(__dirname, 'node_modules')] }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: null
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['legacy.css', 'app.css'],
      append: true
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: '8001'
  }
};

module.exports = config;
