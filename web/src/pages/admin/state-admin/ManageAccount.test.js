import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../util/api';
import userEvent from '@testing-library/user-event';

import ManageAccount from './ManageAccount';

const regularUser = {
  data: {
    role: 'eAPD State Staff',
    state: {
      id: 'ak',
      name: 'Alaska'
    }
  }
};

const adminUser = {
  data: {
    role: 'eAPD State Admin',
    state: {
      id: 'al',
      name: 'Alabama'
    }
  }
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const setup = (props = {}, options = {}) => {
  const user = userEvent.setup();
  const utils = renderWithConnection(<ManageAccount {...props} />, options);
  return {
    user,
    utils
  };
};

describe('<ManageAccount />', () => {
  jest.setTimeout(30000);

  beforeEach(() => {
    fetchMock.reset();
  });

  test('renders correctly for regular user', () => {
    const props = {
      createAccessRequest: jest.fn(),
      completeAccessRequest: jest.fn(),
      dashboard: jest.fn()
    };

    setup(props, {
      initialState: {
        user: regularUser,
        isAdmin: false,
        data: { state: { name: 'Alaska', id: 'ak' } }
      },
      initialHistory: ['/']
    });

    fetchMock.onGet('/affiliations/me').reply(200, []);

    expect(
      screen.getByRole('heading', { name: 'Select your State Affiliation' })
    ).toBeTruthy();
  });

  test('renders correctly for admin user, requests a new affiliation', async () => {
    const props = {
      createAccessRequest: jest.fn(),
      completeAccessRequest: jest.fn(),
      dashboard: jest.fn()
    };

    const { user } = setup(props, {
      initialState: {
        user: adminUser,
        isAdmin: true,
        data: { state: { name: 'Alabama', id: 'al' } }
      },
      initialHistory: ['/']
    });
    fetchMock.onGet('/affiliations/me').reply(200, []);
    fetchMock.onPost('/states/al/affiliations').reply(200);

    expect(
      screen.getByRole('heading', { name: 'Select your State Affiliation' })
    ).toBeTruthy();

    await user.type(
      screen.getByRole('combobox', { name: 'Select your State Affiliation' }),
      '{arrowdown}{enter}'
    );

    expect(screen.getAllByText('Alabama').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
  });
});
