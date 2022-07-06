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
const plugins = ['istanbul'];

module.exports = {
  presets,
  plugins
};
