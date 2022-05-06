const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LinkTypePlugin =
  require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

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
      chunks: 'all'
    },
    moduleIds: 'deterministic'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules\/(?!(d3-array|d3-format|d3-geo)\/)/,
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

          // Creates `style` nodes from JS strings
          'style-loader',
          // Interprets any url() and @import statements and resolves them to
          // their full path on the local disk.
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
          // Load the SCSS/SASS
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
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@uppy/core/dist/style.min.css'),
          path.resolve(
            __dirname,
            'node_modules/@uppy/drag-drop/dist/style.min.css'
          ),
          path.resolve(
            __dirname,
            'node_modules/tinymce/skins/ui/oxide/skin.min.css'
          ),
          path.resolve(
            __dirname,
            'node_modules/tinymce/skins/content/default/content.min.css'
          ),
          path.resolve(
            __dirname,
            'node_modules/tinymce/skins/ui/oxide/content.min.css'
          )
        ],
        use: ['style-loader', 'css-loader']
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules/@uppy/core/dist/style.min.css'),
          path.join(
            __dirname,
            'node_modules/@uppy/drag-drop/dist/style.min.css'
          ),
          path.join(
            __dirname,
            'node_modules/tinymce/skins/ui/oxide/skin.min.css'
          ),
          path.join(
            __dirname,
            'node_modules/tinymce/skins/content/default/content.min.css'
          ),
          path.join(
            __dirname,
            'node_modules/tinymce/skins/ui/oxide/content.min.css'
          )
        ],
        use: ['style-loader', 'css-loader']
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
      OKTA_DOMAIN: '',
      OKTA_SERVER_ID: '',
      OKTA_CLIENT_ID: ''
    }),

    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html'
    }),

    new LinkTypePlugin({
      '*.css': 'text/css'
    })
  ],
  stats: {
    children: true
  }
};

module.exports = config;
