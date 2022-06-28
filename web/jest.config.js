module.exports = {
  coverageDirectory: '../coverage',
  rootDir: 'src',
  setupFiles: ['../polyfills.test.js', '../setup.enzyme.test.js'],
  setupFilesAfterEnv: ['../setup.rtl.test.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^apd-(.*)-library$': '<rootDir>/shared/apd-$1-library.js',
    '\\.(css|scss)$': '<rootDir>/../styleMock.js'
  },
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.[jt]s?$': 'babel-jest',
    '\\.yaml$': 'yaml-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(d3-format|d3-geo|d3-array)/)',
    '\\.cy\\.js$'
  ],
  moduleFileExtensions: ['js', 'yaml']
};
