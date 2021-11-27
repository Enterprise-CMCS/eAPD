import React from 'react';
import { renderWithConnection, waitFor, fireEvent } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../util/api';
import LoginApplication from './LoginApplication';
import * as mockAuth from '../util/auth';

const props = {
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
  error: null,
  fetching: false,
  factorsList: [],
  mfaEnrollType: '',
  verifyData: {}
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('Login Application', () => {
  beforeEach(() => {
    fetchMock.reset();
    jest.clearAllMocks();
  });

  it('should renew the session if the user is not authenticated, but they have an access token', async () => {
    fetchMock.onGet('/me').reply(200, {
      name: 'moop',
      activities: ['something'],
      states: ['mo']
    });
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => '1234567890');
    props.authCheck.mockImplementation(() => Promise.resolve('/dashboard'));
    const { getByText } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: initialAuth }
      }
    );
    // have to use waitFor because there is an async method in useEffect
    await waitFor(() => {
      expect(getByText(/Validating your session/i)).toBeTruthy();
    });
  });

  it('should show the consent banner if the user does not have a cookie', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => false);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    const { getByRole } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: {
          auth: initialAuth
        }
      }
    );
    await waitFor(() => {
      expect(getByRole('button', { name: /Agree and continue/i })).toBeTruthy();
    });
  });

  it('should hide the consent banner if the user clicks agree', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => false);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    const { getByRole } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: {
          auth: initialAuth
        }
      }
    );
    await waitFor(() => {
      expect(getByRole('button', { name: /Agree and continue/i })).toBeTruthy();
    });
    fireEvent.click(getByRole('button', { name: /Agree and continue/i }));
    expect(getByRole('button', { name: /Log in/i })).toBeTruthy();
  });

  it('displays an MFA authentication error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { getByText } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: { ...initialAuth, error: 'MFA_AUTH_FAILED' } }
      }
    );
    await waitFor(() =>
      expect(getByText(/one-time password .* incorrect/i)).toBeTruthy()
    );
  });

  it('displays an expired password error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { getByText } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: { ...initialAuth, error: 'PASSWORD_EXPIRED' } }
      }
    );
    await waitFor(() =>
      expect(getByText(/password has expired/i)).toBeTruthy()
    );
  });

  it('displays authentication error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { getAllByText } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: { ...initialAuth, error: 'AUTH_FAILED' } }
      }
    );
    await waitFor(() =>
      expect(getAllByText(/is incorrect/i).length).toBeGreaterThan(0)
    );
  });

  it('displays generic error message', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { getAllByText } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: { ...initialAuth, error: 'generic error' } }
      }
    );
    await waitFor(() =>
      expect(getAllByText(/Something went wrong/i).length).toBeGreaterThan(0)
    );
  });

  it('should redirect to root if authenticated', () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    const { history } = renderWithConnection(<LoginApplication {...props} />, {
      initialState: {
        auth: { ...initialAuth, authenticated: true }
      }
    });
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
    } = renderWithConnection(<LoginApplication {...props} />, {
      initialHistory: [
        { pathname: '/', state: { from: { pathname: '/dashboard' } } }
      ],
      initialState: {
        auth: { ...initialAuth, authenticated: true, initialCheck: true }
      }
    });
    await waitFor(() => {
      expect(entries[index - 1].pathname).toEqual('/dashboard');
    });
  });

  it('should show the LoginApplication if user is not logged in but has consented', async () => {
    jest.spyOn(mockAuth, 'hasConsented').mockImplementation(() => true);
    jest.spyOn(mockAuth, 'getIdToken').mockImplementation(() => null);
    const { getByRole } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: initialAuth }
      }
    );
    await waitFor(() =>
      expect(getByRole('button', { name: /Log in/i })).toBeTruthy()
    );
  });
});
