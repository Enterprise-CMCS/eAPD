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
        test: /\.s?css$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              import: false
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
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../node_modules')]
              }
            }
          }
        ]
      },
      // {
      //   // Do not transform vendor's CSS with CSS-modules
      //   // The point is that they remain in global scope.
      //   // Since we require these CSS files in our JS or CSS files,
      //   // they will be a part of our compilation either way.
      //   // So, no need for ExtractTextPlugin here.
      //   test: /\.css$/,
      //   include: [
      //     path.join(__dirname, 'src'),
      //     path.join(__dirname, 'node_modules/@uppy/core/dist/style.css'),
      //     path.join(__dirname, 'node_modules/@uppy/drag-drop/dist/style.css'),
      //     path.join(
      //       __dirname,
      //       'node_modules/tinymce/skins/ui/oxide/skin.min.css'
      //     ),
      //     path.join(
      //       __dirname,
      //       'node_modules/tinymce/skins/content/default/content.min.css'
      //     ),
      //     path.join(
      //       __dirname,
      //       'node_modules/tinymce/skins/ui/oxide/content.min.css'
      //     )
      //   ],
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/[hash][ext][query]'
      //   }
      // },
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
    // Plugin for hot module replacement
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
