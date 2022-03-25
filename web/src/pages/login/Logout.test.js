import React from 'react';
import { renderWithConnection, waitFor } from 'apd-testing-library';

import Logout from './Logout';

describe('logout component', () => {
  test('calls the logout property and renders nothing', async () => {
    const props = {
      logout: jest.fn()
    };
    const { history, store } = renderWithConnection(<Logout {...props} />, {
      initialState: { auth: { authenticated: true } }
    });

    await waitFor(() => {
      expect(store.getState().auth.authenticated).toBeFalsy();
    });
    expect(history.location.pathname).toEqual('/login');
  });
});
