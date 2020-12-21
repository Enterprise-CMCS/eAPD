import { renderWithConnection, waitFor } from 'apd-testing-library';
import React from 'react';

import SessionEndingAlert, {
  mapStateToProps,
  mapDispatchToProps
} from './SessionEndingAlert';
import { extendSession, logout } from '../actions/auth';

const props = {
  extend: jest.fn()
};

describe('the session ending alert component', () => {
  it('render as expected if session is not ending and session is not being extended', () => {
    const { container } = renderWithConnection(
      <SessionEndingAlert {...props} />,
      {
        initialState: {
          auth: {
            isSessionEnding: false,
            isExtendingSession: false,
            latestActivity: new Date().getTime(),
            expiresAt: new Date().getTime() + 60000
          }
        }
      }
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders as expected if session is ending and session is not being extended', () => {
    const { container, getByRole } = renderWithConnection(
      <SessionEndingAlert {...props} />,
      {
        initialState: {
          auth: {
            isSessionEnding: true,
            isExtendingSession: false,
            latestActivity: new Date().getTime() - 300000,
            expiresAt: new Date().getTime() + 60000
          }
        }
      }
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
    expect(getByRole('button', { name: 'Continue' })).toBeTruthy();
  });

  it('renders as expected if session is ending and session is not being extended, but new activity', async () => {
    const { container } = renderWithConnection(
      <SessionEndingAlert {...props} />,
      {
        initialState: {
          auth: {
            isSessionEnding: true,
            isExtendingSession: false,
            latestActivity: new Date().getTime(),
            expiresAt: new Date().getTime() + 60000
          }
        }
      }
    );
    await waitFor(() =>
      expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
    );
  });

  it('renders as expected if there is and error and is saving', () => {
    const { container, getByRole } = renderWithConnection(
      <SessionEndingAlert {...props} />,
      {
        initialState: {
          auth: {
            isSessionEnding: true,
            isExtendingSession: true,
            latestActivity: new Date().getTime() - 300000,
            expiresAt: new Date().getTime() + 60000
          }
        }
      }
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');
    expect(getByRole('button', { name: 'Continuing' })).toBeTruthy();
  });

  it('maps redux state to component props', () => {
    const latestActivity = new Date().getTime();
    const expiresAt = new Date().getTime + 60000;
    expect(
      mapStateToProps({
        auth: {
          isSessionEnding: false,
          isExtendingSession: false,
          latestActivity,
          expiresAt
        }
      })
    ).toEqual({
      isSessionEnding: false,
      isExtendingSession: false,
      latestActivity,
      expiresAt
    });
  });

  it('maps redux actions to component props', () => {
    expect(mapDispatchToProps).toEqual({
      extend: extendSession,
      logoutAction: logout
    });
  });
});
