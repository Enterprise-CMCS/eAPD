module.exports = {
  coverageDirectory: '../coverage',
  rootDir: 'src',
  setupFiles: ['../polyfills.test.js', '../setup.enzyme.test.js'],
  setupFilesAfterEnv: ['../setup.rtl.test.js'],
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  moduleNameMapper: {
    'apd-testing-library': '<rootDir>/shared/apd-testing-library.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '\\.js?$': 'babel-jest',
    '\\.yaml$': 'yaml-jest'
  }
};
