const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    publicPath: '/',

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

        // Remember that these run in reverse, so start at the last item in the
        // array and read up to understand what's going on.
        use: [
          {
            // Extracts all that CSS into a file and plops it on the disk.
            loader: 'file-loader',
            options: { name: 'app.css' }
          },

          // Converts the local disk paths from css-loader into their final
          // paths relative to the dist directory, then pulls everything
          // together
          MiniCssExtractPlugin.loader,

          // Interprets any url() and @import statements and resolves them to
          // their full path on the local disk.
          'css-loader',

          // Handles resolving and importing all the CSS files, so we end up
          // with one nice, big file to deal with. Also adds vendor prefixes
          // as necessary for CSS rules that aren't yet widely supported.
          'postcss-loader',

          {
            // Parse the Sass into CSS.
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
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),

    // replaces "process.env.____" with the values defined in the actual
    // environment at build time
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
    })
  ]
};

module.exports = config;
