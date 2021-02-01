// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/jest-dom/extend-expect';

jest.mock('./src/file-loader', () => ({
  importFiles: () => {
    return 'file-path-mock';
  }
}));

/* This mock is needed to prevent tests from calling out to Okta */
jest.mock('./src/util/oktaAuth', () => {
  return {
    signInWithCredentials: jest.fn(),
    closeSession: jest.fn(),
    token: {
      getWithoutPrompt: jest.fn()
    },
    getAccessToken: jest.fn(),
    revokeAccessToken: jest.fn(),
    tokenManager: {
      add: jest.fn(),
      remove: jest.fn(),
      setTokens: jest.fn(),
      get: jest.fn(() => Promise.resolve({ accessToken: 'aaa.bbb.ccc' })),
      on: jest.fn(),
      off: jest.fn(),
      renew: jest.fn(() => Promise.resolve()),
      hasExpired: jest.fn()
    },
    tx: {
      exists: jest.fn(),
      resume: jest.fn()
    }
  };
});
