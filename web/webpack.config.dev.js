const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: [
    'webpack/hot/dev-server.js',
    'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    path.join(__dirname, 'src/app.dev.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(d3-format|d3-geo|d3-array)\/)/,
        use: ['babel-loader']
      },

      // In dev, load our styles directly into the generated JS. That way
      // we got hot reloading on our Sass as well.
      {
        test: /\.scss$/,

        // Remember that these run in reverse, so start at the last item in the
        // array and read up to understand what's going on.
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',

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

          // Compiles Sass to CSS
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
        test: /\.yaml$/,
        use: ['yaml-loader']
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
      OKTA_CLIENT_ID: '',
      TEALIUM_ENV: '',
      LD_CLIENT_ID: process.env.LD_CLIENT_ID
    }),
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
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
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist/static'),
      publicPath: '/static/'
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '8001',
    // Dev server client for web socket transport, hot and live reload logic
    hot: false,
    client: false
  }
};

module.exports = config;
