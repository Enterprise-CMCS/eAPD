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
  'babel-plugin-transform-require-context',
  '@babel/plugin-transform-runtime'
];

module.exports = {
  presets,
  plugins
};
