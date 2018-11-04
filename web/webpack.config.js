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
          use: [
            { loader: 'css-loader', options: { sourceMap: !isProd } },
            {
              loader: 'postcss-loader',
              options: { sourceMap: !isProd && 'inline' }
            }
          ]
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
      API_URL: null
    }),
    new ExtractTextPlugin('app.css')
  ]
};

if (isProd) {
  config.plugins.push(new UglifyJSPlugin());
} else {
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;
