import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  screen
} from 'apd-testing-library';

import Login from './Login';

import MockAdapter from 'axios-mock-adapter';
import axios from '../util/api';

const defaultProps = {
  hasEverLoggedOn: false,
  errorMessage: null,
  fetching: false,
  login: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<Login {...defaultProps} {...props} />);

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

describe('login component', () => {
  beforeEach(() => {
    defaultProps.login.mockReset();
    fetchMock.reset();
    fetchMock.onGet('/heartbeat').reply(200, {});
  });

  it('renders correctly if logged in previously but not logged in now (shows logout notice)', () => {
    setup({ hasEverLoggedOn: true });

    expect(screen.getByText(/You have securely logged out/i)).toBeTruthy();
  });

  it('renders correctly if not logged in, and never logged in', () => {
    setup();

    expect(screen.queryByText(/You have securely logged out/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /log in/i })).toBeDisabled();

    fireEvent.change(screen.queryByLabelText('EUA ID'), {
      target: { name: 'username', value: 'bob' }
    });
    fireEvent.change(screen.queryByLabelText('Password'), {
      target: { name: 'password', value: 'secret' }
    });

    expect(screen.queryByRole('button', { name: /log in/i })).toBeEnabled();
  });

  it('renders correctly if not logged in and there is an error', () => {
    setup({ errorMessage: 'something here' });

    expect(screen.getByText('something here')).toBeTruthy();
  });

  it('renders correctly if not logged in and fetching data', () => {
    const { container } = setup({ fetching: true });

    expect(screen.getByRole('button', { name: /logging in/i })).toBeTruthy();
    expect(
      screen.queryByRole('button', { name: /logging in/i })
    ).toBeDisabled();
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('renders forgot password help text and link', () => {
    setup();
    expect(screen.getByText(/Forgot password?/i)).toBeTruthy();
    expect(
      screen.getByRole('link', { name: /Reset password at EUA/i })
    ).toBeTruthy();
  });

  it('renders new user guides, links, and help email', () => {
    setup();

    expect(screen.getByRole('heading', { name: 'New Users' })).toBeTruthy();
    expect(
      screen.getByText(
        'New users must have an EUA account with the correct job codes before logging into the system.'
      )
    ).toBeTruthy();

    expect(
      screen.getByRole('link', { name: 'How to Get Started' })
    ).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'How to Access the eAPD' })
    ).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'CMS-EAPD@cms.hhs.gov' })
    ).toBeTruthy();
  });

  it('calls login prop', () => {
    setup();

    fireEvent.change(screen.queryByLabelText('EUA ID'), {
      target: { name: 'username', value: 'bob' }
    });
    fireEvent.change(screen.queryByLabelText('Password'), {
      target: { name: 'password', value: 'secret' }
    });

    fireEvent.click(screen.queryByRole('button', { name: /log in/i }));
    expect(defaultProps.login).toHaveBeenCalledWith('bob', 'secret');
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = setup();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should show the warning text if heartbeat returns an error', async () => {
    fetchMock.onGet('/heartbeat').timeout();
    setup();

    expect(
      await screen.findByText('The eAPD system is down, try again later.')
    ).toBeTruthy();
  });
});
