module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    ['@babel/preset-react']
  ];
  const plugins = [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    presets,
    plugins
    // env: {
    //   test: {
    //     plugins: [
    //       '@babel/plugin-transform-runtime',
    //       'transform-require-context'
    //     ]
    //   }
    // }
  };
};
