const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    js: path.join(__dirname, 'src/app.js')
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
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
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
      LOG_FORM_INTERACTIONS: false
    }),
    new ExtractTextPlugin('app.css')
  ]
};

if (isProd) {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
