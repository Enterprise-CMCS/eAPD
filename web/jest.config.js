module.exports = {
  coverageDirectory: '../coverage/',
  rootDir: 'src',
  setupFiles: [
    '../polyfills.test.js',
    '../setup.enzyme.test.js',
    'jest-launchdarkly-mock'
  ],
  setupFilesAfterEnv: ['../setup.rtl.test.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '^apd-(.*)-library$': '<rootDir>/shared/apd-$1-library.js',
    '\\.(css|scss)$': '<rootDir>/../styleMock.js'
  },
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.yaml$': 'yaml-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(d3-format|d3-geo|d3-array|@cms-eapd)/)',
    '\\.cy\\.js$'
  ],
  moduleFileExtensions: ['js', 'jsx', 'yaml'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.story.{js,jsx}',
    '!**/*.stories.{js,jsx}',
    '!**/*.test.{js,jsx}',
    '!**/*.cy.{js,jsx}',
    '!**/node_modules/**',
    '!**/__snapshots__/**',
    '!**/shared/**',
    '!**/fixtures/**',
    '!**/i18n/**',
    '!**/lazy/**',
    '!**/shared/**',
    '!**/static/**',
    '!**/file-loader.js',
    '!**/app.dev.js',
    '!**/app.js',
    '!**/constants.js',
    '!**/components/EnableCookies.js',
    '!**/util/analytics.js',
    '!**/util/oktaAuth.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80
    }
  }
};
