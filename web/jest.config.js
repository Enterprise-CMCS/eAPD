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
    '\\.yaml$': 'yaml-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: ['node_modules/(?!(d3-format|d3-geo|d3-array)/)'],
  moduleFileExtensions: ['js', 'yaml'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.story.{js,jsx}',
    '!**/*.stories.{js,jsx}',
    '!**/*.test.{js,jsx}',
    '!**/node_modules/**',
    '!**/__snapshots__/**',
    '!**/fixtures/**',
    '!**/i18n/**',
    '!**/shared/**',
    '!**/static/**'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80
    }
  }
};
