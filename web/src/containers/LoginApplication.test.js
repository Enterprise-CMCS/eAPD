import React from 'react';
import {
  renderWithConnection,
  waitFor,
  fireEvent,
  screen
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../util/api';
import LoginApplication from './LoginApplication';
import * as mockAuth from '../util/auth';

const defaultProps = {
  mfaConfig: jest.fn(),
  mfaAddPhone: jest.fn(),
  mfaActivate: jest.fn(),
  createAccessRequest: jest.fn(),
  completeAccessRequest: jest.fn(),
  authCheck: jest.fn(),
  login: jest.fn(),
  loginOtp: jest.fn(),
  logout: jest.fn()
};

const initialAuth = {
  hasEverLoggedOn: false,
  authenticated: false,
  initialCheck: true,
  error: null,
  fetching: false,
  factorsList: [],
  mfaEnrollType: '',
  verifyData: {}
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const setup = (props = {}, options = {}) =>
  renderWithConnection(
    <LoginApplication {...defaultProps} {...props} />,
    options
  );

describe('Login Application', () => {
  beforeEach(() => {
    fetchMock.reset();
    jest.clearAllMocks();
    fetchMock.onGet('/heartbeat').reply(200, {});
  });

  it('should renew the session if the user is not authenticated, but they have an access token', async () => {
    fetchMock.onGet('/me').reply(200, {
      name: 'moop',
      activities: ['something'],
      states: ['mo']
    });
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => '1234567890');
    defaultProps.authCheck.mockImplementation(() =>
      Promise.resolve('/dashboard')
    );
    setup(
      {},
      {
        initialState: {
          auth: {
            ...initialAuth,
            initialCheck: false
          }
        }
      }
    );
    // have to use waitFor because there is an async method in useEffect
    await waitFor(() => {
      expect(screen.getByText(/Validating your session/i)).toBeTruthy();
    });
  });

  it('should show the consent banner if the user does not have a cookie', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => false);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    setup(
      {},
      {
        initialState: {
          auth: initialAuth
        }
      }
    );
    expect(
      screen.getByRole('button', { name: /Agree and continue/i })
    ).toBeTruthy();
  });

  it('should hide the consent banner if the user clicks agree', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => false);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    setup(
      {},
      {
        initialState: {
          auth: initialAuth
        }
      }
    );
    expect(
      screen.getByRole('button', { name: /Agree and continue/i })
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole('button', { name: /Agree and continue/i })
    );
    expect(screen.getByRole('button', { name: /Log in/i })).toBeTruthy();
  });

  it('displays an MFA authentication error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    setup(
      {},
      {
        initialState: { auth: { ...initialAuth, error: 'MFA_AUTH_FAILED' } }
      }
    );
    expect(screen.getByText(/one-time password .* incorrect/i)).toBeTruthy();
  });

  it('displays an expired password error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    setup(
      {},
      {
        initialState: { auth: { ...initialAuth, error: 'PASSWORD_EXPIRED' } }
      }
    );
    expect(screen.getByText(/password has expired/i)).toBeTruthy();
  });

  it('displays authentication error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    setup(
      {},
      {
        initialState: { auth: { ...initialAuth, error: 'AUTH_FAILED' } }
      }
    );
    expect(screen.getAllByText(/is incorrect/i).length).toBeGreaterThan(0);
  });

  it('displays generic error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    setup(
      {},
      {
        initialState: { auth: { ...initialAuth, error: 'generic error' } }
      }
    );
    expect(screen.getAllByText(/Something went wrong/i).length).toBeGreaterThan(
      0
    );
  });

  it('should redirect to root if authenticated', () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { history } = setup(
      {},
      {
        initialState: {
          auth: { ...initialAuth, authenticated: true }
        }
      }
    );
    expect(history.location.pathname).toEqual('/');
  });

  it('should redirect to where it came from if authenticated', async () => {
    fetchMock.onGet('/me').reply(200, {
      name: 'moop',
      activities: ['something'],
      states: ['mo']
    });
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => '1234567890');
    const {
      history: { entries, index }
    } = setup(
      {},
      {
        initialHistory: [
          { pathname: '/', state: { from: { pathname: '/dashboard' } } }
        ],
        initialState: {
          auth: { ...initialAuth, authenticated: true, initialCheck: true }
        }
      }
    );
    expect(entries[index - 1].pathname).toEqual('/dashboard');
  });

  it('should show the LoginApplication if user is not logged in but has consented', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    setup(
      {},
      {
        initialState: { auth: initialAuth }
      }
    );
    expect(screen.getByRole('button', { name: /Log in/i })).toBeTruthy();
  });
});
