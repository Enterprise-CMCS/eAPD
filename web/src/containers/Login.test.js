import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';

import Login from './Login';

const defaultProps = {
  hasEverLoggedOn: false,
  errorMessage: null,
  fetching: false,
  login: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<Login {...defaultProps} {...props} />);

describe('login component', () => {
  beforeEach(() => {
    defaultProps.login.mockReset();
  });

  it('renders correctly if logged in previously but not logged in now (shows logout notice)', () => {
    const { queryByText } = setup({ hasEverLoggedOn: true });

    expect(queryByText(/You have securely logged out/i)).toBeTruthy();
  });

  it('renders correctly if not logged in, and never logged in', () => {
    const { queryByText, queryByRole, queryByLabelText } = setup();

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
    const { queryByText } = setup({ errorMessage: 'something here' });

    expect(queryByText('something here')).toBeTruthy();
  });

  it('renders correctly if not logged in and fetching data', () => {
    const { container, queryByRole } = setup({ fetching: true });

    expect(queryByRole('button', { name: /logging in/i })).toBeTruthy();
    expect(queryByRole('button', { name: /logging in/i })).toBeDisabled();
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('calls login prop', () => {
    const { queryByRole, queryByLabelText } = setup();

    fireEvent.change(queryByLabelText('EUA ID'), {
      target: { name: 'username', value: 'bob' }
    });
    fireEvent.change(queryByLabelText('Password'), {
      target: { name: 'password', value: 'secret' }
    });

    fireEvent.click(queryByRole('button', { name: /log in/i }));
    expect(defaultProps.login).toHaveBeenCalledWith('bob', 'secret');
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = setup();

    expect(await axe(container)).toHaveNoViolations();
  });
});
