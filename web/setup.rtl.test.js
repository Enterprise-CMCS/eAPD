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
    signIn: jest.fn(),
    signOut: jest.fn(),
    token: {
      getWithoutPrompt: jest.fn()
    },
    tokenManager: {
      add: jest.fn(),
      remove: jest.fn(),
      get: jest.fn(() => Promise.resolve({ accessToken: 'aaa.bbb.ccc' }))
    },
    tx: {
      exists: jest.fn(),
      resume: jest.fn()
    }
  };
});
