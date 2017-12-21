module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 2%']
    },
    cssnano: { autoprefixer: false }
  }
};
