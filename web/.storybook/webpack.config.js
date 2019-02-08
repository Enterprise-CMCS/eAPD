const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: { includePaths: [path.resolve(__dirname, 'node_modules')] }
          }
        ]
      },
      {
        test: /\.yaml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  }
};
