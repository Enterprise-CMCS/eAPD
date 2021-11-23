module.exports = {
  coverageDirectory: '../coverage',
  rootDir: 'src',
  setupFiles: ['../polyfills.test.js', '../setup.enzyme.test.js'],
  setupFilesAfterEnv: ['../setup.rtl.test.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^apd-(.*)-library$': '<rootDir>/shared/apd-$1-library.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '\\.yaml$': 'jest-transform-yaml',
    '\\.js?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'yaml'],
  testEnvironment: 'jsdom'
};
