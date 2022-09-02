// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import '@okta/okta-auth-js/polyfill';

expect.extend(toHaveNoViolations);

jest.mock('./src/file-loader', () => ({
  importFiles: () => {
    return 'file-path-mock';
  }
}));

/* This mock is needed to prevent tests from calling out to Okta */
jest.mock('./src/util/oktaAuth', () => {
  return {
    signInWithCredentials: jest.fn(),
    closeSession: jest.fn(() => Promise.resolve({})),
    token: {
      getWithoutPrompt: jest.fn()
    },
    getAccessToken: jest.fn(),
    getIdToken: jest.fn(),
    revokeAccessToken: jest.fn(() => Promise.resolve({})),
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

Object.defineProperty(window.document, 'cookie', {
  writable: true
});
