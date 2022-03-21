import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  waitFor
} from 'apd-testing-library';

import Login from './Login';

import MockAdapter from 'axios-mock-adapter';
import axios from '../../util/api';

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
    const { getByText } = setup({ hasEverLoggedOn: true });

    expect(getByText(/You have securely logged out/i)).toBeTruthy();
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
    const { getByText } = setup({ errorMessage: 'something here' });

    expect(getByText('something here')).toBeTruthy();
  });

  it('renders correctly if not logged in and fetching data', () => {
    const { container, queryByRole } = setup({ fetching: true });

    expect(queryByRole('button', { name: /logging in/i })).toBeTruthy();
    expect(queryByRole('button', { name: /logging in/i })).toBeDisabled();
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('renders forgot password help text and link', () => {
    const { getByText, getByRole } = setup();
    expect(getByText(/Forgot password?/i)).toBeTruthy();
    expect(getByRole('link', { name: /Reset password at EUA/i })).toBeTruthy();
  });

  it('renders new user guides, links, and help email', () => {
    const { getByText, getByRole } = setup();

    expect(getByRole('heading', { name: 'New Users' })).toBeTruthy();
    expect(
      getByText(
        'New users must have an EUA account with the correct job codes before logging into the system.'
      )
    ).toBeTruthy();

    expect(getByRole('link', { name: 'How to Get Started' })).toBeTruthy();
    expect(getByRole('link', { name: 'How to Access the eAPD' })).toBeTruthy();
    expect(getByRole('link', { name: 'CMS-EAPD@cms.hhs.gov' })).toBeTruthy();
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

  it('should show the warning text if heartbeat returns an error', async () => {
    fetchMock.onGet('/heartbeat').timeout();
    const { getByText } = setup();

    await waitFor(() => {
      expect(
        getByText('The eAPD system is down, try again later.')
      ).toBeTruthy();
    });
  });
});
