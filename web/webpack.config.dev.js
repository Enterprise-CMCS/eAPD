const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    js: [
      path.join(__dirname, 'src/app.dev.js'),
      path.join(__dirname, 'src/styles/index.scss')
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // In dev, load our styles directly into the generated JS. That way
      // we got hot reloading on our Sass as well.
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
      API_URL: null,
      // 20 days idle and you'll get logged out. Would be longer for maximum
      // convenience, but it turns out Javascript timers treat durations as
      // 32-bit signed integers, which means the max is 2,147,483,647. That is
      // a lot of milliseconds, but it comes out to about 24.86 days.  So...
      // lesson here is that we can't schedule anything further out than that
      // using the native timers. But you know what makes this really weird?
      // The overflow causes the timers to execute IMMEDIATELY. There's no
      // integer overflow (which is probably good) or throwing an error
      // (which would be really nice, because this was hard to diagnose).
      IDLE_LOGOUT_TIME_MINUTES: 28800
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Inject our app scripts into our HTML kickstarter
    new HtmlWebpackPlugin({
      minify: { removeComments: true },
      template: 'src/index.html'
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
