module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', '> 2%']
    }),
    require('cssnano')({ autoprefixer: false })
  ]
};
