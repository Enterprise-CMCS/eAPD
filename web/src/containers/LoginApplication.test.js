import React from 'react';
import { renderWithConnection, waitFor } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../util/api';
import { plain as LoginApplication } from './LoginApplication';
import * as mockAuth from '../util/auth';

const props = {
  mfaConfig: jest.fn(),
  mfaAddPhone: jest.fn(),
  mfaActivate: jest.fn(),
  createAccessRequest: jest.fn(),
  completeAccessToState: jest.fn(),
  completeAccessRequest: jest.fn(),
  authCheck: jest.fn(),
  login: jest.fn(),
  loginOtp: jest.fn(),
  logout: jest.fn(),
  location: {},
  hasEverLoggedOn: false,
  authenticated: false,
  error: null,
  fetching: false,
  factorsList: [],
  mfaEnrollType: '',
  verifyData: {}
};

const fetchMock = new MockAdapter(axios);

describe('Login Application', () => {
  beforeEach(() => {
    fetchMock.reset();
    jest.clearAllMocks();
  });

  it('should show the consent banner if the user does not have a cookie', () => {
    const { getByRole } = renderWithConnection(<LoginApplication {...props} />);
    expect(getByRole('button', { name: /Agree and continue/i })).toBeTruthy();
  });

  it('displays authentication error message', () => {
    jest
      .spyOn(mockAuth, 'hasConsented')
      .mockImplementation(() => Promise.resolve(true));
    const { getAllByText } = renderWithConnection(
      <LoginApplication {...props} error="AUTH_FAILED" />
    );
    expect(getAllByText(/is incorrect/i).length).toBeGreaterThan(0);
  });

  it('displays generic error message', () => {
    jest
      .spyOn(mockAuth, 'hasConsented')
      .mockImplementation(() => Promise.resolve(true));
    const { getAllByText } = renderWithConnection(
      <LoginApplication {...props} error="generic error" />
    );
    expect(getAllByText(/Something went wrong/i).length).toBeGreaterThan(0);
  });

  it('should redirect to root if authenticated', () => {
    jest
      .spyOn(mockAuth, 'hasConsented')
      .mockImplementation(() => Promise.resolve(true));
    const { history } = renderWithConnection(
      <LoginApplication {...props} authenticated />,
      {
        initialState: {
          auth: { authenticated: true }
        }
      }
    );
    expect(history.location.pathname).toEqual('/');
  });

  it('should redirect to where it came from if authenticated', () => {
    fetchMock.onGet('/me').reply(200, {
      name: 'moop',
      activities: ['something'],
      states: ['mo']
    });
    jest
      .spyOn(mockAuth, 'hasConsented')
      .mockImplementation(() => Promise.resolve(true));
    jest
      .spyOn(mockAuth, 'getAccessToken')
      .mockImplementation(() => '1234567890');
    const { history } = renderWithConnection(
      <LoginApplication {...props} authenticated />,
      {
        initialHistory: [
          { pathname: '/', state: { from: { pathname: '/dashboard' } } }
        ],
        initialState: { auth: { authenticated: true } }
      }
    );
    expect(history.entries[history.index - 1].pathname).toEqual('/dashboard');
  });

  it('should show the LoginApplication if user is not logged in but has consented', async () => {
    jest
      .spyOn(mockAuth, 'hasConsented')
      .mockImplementation(() => Promise.resolve(true));
    jest.spyOn(mockAuth, 'getAccessToken').mockImplementation(() => null);
    const { getByRole } = renderWithConnection(
      <LoginApplication {...props} />,
      {
        initialState: { auth: { authenticated: false } }
      }
    );
    await waitFor(() =>
      expect(getByRole('button', { name: /Log in/i })).toBeTruthy()
    );
  });
});
