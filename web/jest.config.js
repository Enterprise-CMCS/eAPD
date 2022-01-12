module.exports = {
  globals: {
    'babel-jest': {
      babelrcFile: '<rootDir>/.babelrc.js'
    }
  },
  coverageDirectory: '../coverage',
  rootDir: 'src',
  setupFiles: ['../polyfills.test.js', '../setup.enzyme.test.js'],
  setupFilesAfterEnv: ['../setup.rtl.test.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^apd-(.*)-library$': '<rootDir>/shared/apd-$1-library.js'
  },
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '\\.yaml$': 'yaml-jest',
    '\\.js?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: [
    // add node_modules here that _should_ be transformed
    '/node_modules/(?!(d3-format|d3-geo)/)/'
  ],
  moduleFileExtensions: ['js', 'yaml']
};
