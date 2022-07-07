const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ]
];
const plugins = [];

module.exports = {
  presets,
  plugins
};
