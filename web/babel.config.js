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
const plugins = [];

module.exports = {
  presets,
  plugins
};
