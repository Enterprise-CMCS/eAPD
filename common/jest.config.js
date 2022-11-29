export default {
  coverageDirectory: './coverage-endpoint/',
  rootDir: './',
  testMatch: ['**/*.test.{js,jsx}'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  testTimeout: 30000,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/coverage-endpoint/'],
  coverageThreshold: {
    global: {
      branches: 74,
      functions: 80,
      lines: 80
    }
  }
};
