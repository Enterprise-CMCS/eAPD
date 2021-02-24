import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';

import Login from './Login';

describe('login component', () => {
  it('renders correctly if logged in previously but not logged in now (shows logout notice)', () => {
    const { queryByText } = renderWithConnection(
      <Login
        hasEverLoggedOn
        errorMessage={null}
        fetching={false}
        login={() => {}}
      />
    );

    // should never be a consent banner, so no need to clicky through it
    expect(queryByText(/You have securely logged out/i)).toBeTruthy();
  });

  it('renders correctly if not logged in, and never logged in', () => {
    const { queryByText, queryByRole, queryByLabelText } = renderWithConnection(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching={false}
        login={() => {}}
      />
    );

    expect(queryByText(/You have securely logged out/i)).toBeNull();
    expect(queryByRole('button', { name: /log in/i })).toBeDisabled();

    fireEvent.change(queryByLabelText('EUA ID'), {
      target: { name: 'username', value: 'bob' }
    });
    fireEvent.change(queryByLabelText('Password'), {
      target: { name: 'password', value: 'secret' }
    });

    expect(queryByRole('button', { name: /log in/i })).toBeEnabled();
  });

  it('renders correctly if not logged in and there is an error', () => {
    const { queryByText } = renderWithConnection(
      <Login
        hasEverLoggedOn={false}
        errorMessage="something here"
        fetching={false}
        login={() => {}}
      />
    );

    expect(queryByText('something here')).toBeTruthy();
  });

  it('renders correctly if not logged in and fetching data', () => {
    const { container, queryByRole } = renderWithConnection(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching
        login={() => {}}
      />
    );

    expect(queryByRole('button', { name: /logging in/i })).toBeTruthy();
    expect(queryByRole('button', { name: /logging in/i })).toBeDisabled();
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('calls login prop', () => {
    const loginProp = jest.fn();

    const { queryByRole, queryByLabelText } = renderWithConnection(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching={false}
        login={loginProp}
      />
    );

    fireEvent.change(queryByLabelText('EUA ID'), {
      target: { name: 'username', value: 'bob' }
    });
    fireEvent.change(queryByLabelText('Password'), {
      target: { name: 'password', value: 'secret' }
    });

    fireEvent.click(queryByRole('button', { name: /log in/i }));
    expect(loginProp).toHaveBeenCalledWith('bob', 'secret');
  });

  it('should not fail any accessibility tests', async () => {
    const props = {
      hasEverLoggedOn: false,
      errorMessage: null,
      fetching: false,
      login: jest.fn()
    };
    const { container } = renderWithConnection(<Login {...props} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
