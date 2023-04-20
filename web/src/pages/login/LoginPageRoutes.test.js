import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import LoginPageRoutes from './LoginPageRoutes';

import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import * as hooks from '../../util/hooks';
import { STATES } from '../../util/states';

const defaultProps = {
  hasEverLoggedOn: false,
  fetching: false,
  factorsList: [
    {
      id: 'emf5n20o64XfgZV7E297',
      factorType: 'email',
      provider: 'OKTA',
      vendorName: 'OKTA',
      profile: {
        email: 'test@email.com'
      }
    }
  ],
  verifyData: {
    qrcode: { href: 'www.test.com' }
  },
  handleFactorSelection: jest.fn(),
  handlePhoneSubmit: jest.fn(),
  handleVerificationCode: jest.fn(),
  handleCreateAccessRequest: jest.fn(),
  handleCompleteAccessRequest: jest.fn(),
  handleLogin: jest.fn(),
  handleLoginOtp: jest.fn(),
  handleLogout: jest.fn()
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(
    <LoginPageRoutes {...defaultProps} {...props} />,
    options
  );

describe('LoginPageRoutes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetLDMocks();
    mockFlags({ supportStateAvailable: false });
    jest.spyOn(hooks, 'useAvailableStates').mockImplementation(() => STATES);
  });

  it('should redirect the user to Login if the path is /login', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login']
      }
    );
    expect(screen.getByRole('heading', { name: /Log in/i })).toBeTruthy();
  });

  it('should redirect the user to Account Locked if that path is /login/locked-out', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/locked-out']
      }
    );
    expect(
      screen.getByRole('heading', { name: /Account Locked/i })
    ).toBeTruthy();
  });

  it('should redirect the user to LoginMFAEnroll if that path is /login/mfa/enroll', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/mfa/enroll']
      }
    );
    expect(
      screen.getByText(/Choose a Multi-Factor Authentication route/i)
    ).toBeTruthy();
  });

  it('should redirect the user to LoginMFAEnrollPhoneNumber if that path is /login/mfa/configure-phone', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/mfa/configure-phone']
      }
    );
    expect(screen.getByText(/Please enter your phone number/i)).toBeTruthy();
  });

  it('should redirect the user to LoginMFAVerifyAuthApp if that path is /login/mfa/configure-app', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/mfa/configure-app']
      }
    );
    expect(
      screen.getByText(/Configure Multi-Factor Authentication/i)
    ).toBeTruthy();
  });

  it('should redirect the user to LoginMFA if that path is /login/mfa/activate', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/mfa/activate']
      }
    );
    expect(screen.getByText(/Enter the verification code /i)).toBeTruthy();
  });

  it('should redirect the user to LoginMFA if that path is /login/mfa/verify', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/mfa/verify']
      }
    );
    expect(screen.getByText(/Enter the verification code /i)).toBeTruthy();
  });

  it('should redirect the user to StateAccessRequest if that path is /login/affiliations/request', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/affiliations/request']
      }
    );
    expect(screen.getByLabelText('Select your State Affiliation')).toBeTruthy();
  });

  it('should redirect the user to StateAccessRequestConfirmation if that path is /login/affiliations/thank-you', () => {
    const useRouteMatch = jest.fn().mockReturnValue({ path: '/login' });
    setup(
      { useRouteMatch },
      {
        initialHistory: ['/login/affiliations/thank-you']
      }
    );
    expect(
      screen.getByText(
        /An administrator will verify your affiliation and credentials/i
      )
    ).toBeTruthy();
  });
});
