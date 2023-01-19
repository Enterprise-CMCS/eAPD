const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  entry: {
    app: [path.join(__dirname, 'src/app.js')]
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
      chunks: 'all',
      cacheGroups: {
        tinymceVendor: {
          test: /[\\/]node_modules[\\/](tinymce)[\\/](.*js|.*skin.css)|[\\/]plugins[\\/]/,
          name: 'tinymce'
        }
      }
    },
    moduleIds: 'deterministic'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(d3-format|d3-geo|d3-array|@cms-eapd)\/)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,

        // Remember that these run in reverse, so start at the last item in the
        // array and read up to understand what's going on.
        use: [
          // Converts the local disk paths from css-loader into their final
          // paths relative to the dist directory, then pulls everything
          // together
          MiniCssExtractPlugin.loader,

          // Interprets any url() and @import statements and resolves them to
          // their full path on the local disk. Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              import: true
            }
          },

          // Add browser prefixes and minify CSS.
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },

          // Load the SCSS/SASS
          'sass-loader'
        ]
      },
      {
        test: /skin\.min\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /content\.min\.css$/i,
        use: ['css-loader']
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.yaml$/,
        use: ['yaml-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),

    // replaces "process.env.____" with the values defined in the actual
    // environment at build time
    new webpack.EnvironmentPlugin({
      API_URL: null,
      OKTA_DOMAIN: '',
      OKTA_SERVER_ID: '',
      OKTA_CLIENT_ID: '',
      TEALIUM_ENV: process.env.TEALIUM_ENV,
      LD_CLIENT_ID: process.env.LD_CLIENT_ID
    }),

    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html',

      // Tealium
      tealiumUrl: `https://tags.tiqcdn.com/utag/cmsgov/cms-eapd/${process.env.TEALIUM_ENV}/utag.sync.js`,
      tealiumProfile: 'cms-eapd',
      environment: process.env.TEALIUM_ENV
    })
  ],
  stats: {
    children: true
  }
};

module.exports = config;
