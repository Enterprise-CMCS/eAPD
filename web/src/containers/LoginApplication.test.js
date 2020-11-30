import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import LoginApplication from './LoginApplication';

const redux = {
  hasEverLoggedOn: false,
  authenticated: false,
  error: null,
  fetching: false,
  factorsList: [],
  verifyData: null,
  mfaEnrollType: null
};

const props = {
  mfaConfig: jest.fn(),
  mfaAddPhone: jest.fn(),
  mfaActivate: jest.fn(),
  createAccessRequest: jest.fn(),
  completeAccessToState: jest.fn(),
  login: jest.fn(),
  loginOtp: jest.fn(),
  location: {},
  history: {}
};

describe('Login Application', () => {
  xit('should redirect to root if authenticated', () => {
    const { history } = renderWithConnection(
      <LoginApplication {...props} authenticated />,
      {
        initialState: {
          auth: {
            ...redux,
            authenticated: true
          }
        }
      }
    );
    expect(history.location.pathname).toEqual('/');
  });

  it('should redirect to where it came from if authenticated', () => {
    // window.history.pushState({ from: '/dashboard' }, 'pushState example');
    const testProps = {
      ...props,
      authenticated: true
    };
    const { history } = renderWithConnection(
      <LoginApplication {...testProps} />,
      {
        initialHistory: {
          to: '/',
          state: { from: { pathname: '/dashboard' } }
        },
        initialState: {
          auth: {
            ...redux,
            authenticated: true
          }
        }
      }
    );
    console.log({ history });
    const back = history.go(-2);
    console.log({ history, back });
    expect(history.location.pathname).toEqual('/dashboard');
  });
});
