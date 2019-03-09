const path = require('path');

const webpack = require('webpack');

const config = {
  mode: 'production',
  entry: {
    js: [
      path.join(__dirname, 'src/app.js'),
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
        use: { loader: 'babel-loader' }
      },

      // In prod, split our styles into their own files. FOr now, legacy.css
      // is where our "old" CSS goes - it has to be kept separate because it
      // has some CSS @imports that Webpack is able to resolve, but node-sass
      // cannot.  Our new Sass-based styles will go into app.css.

      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'legacy.css' }
          },
          'extract-loader',
          'css-loader',
          'postcss-loader'
        ]
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
    })
  ]
};

module.exports = config;
