import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../util/api';
import userEvent from '@testing-library/user-event';

import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import * as hooks from '../../../util/hooks';
import { STATES } from '../../../util/states';

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
    resetLDMocks();
    mockFlags({ supportStateAvailable: false });
    jest.spyOn(hooks, 'useAvailableStates').mockImplementation(() => STATES);
  });

  test('renders correctly for regular user', () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);

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

    expect(
      screen.getByRole('heading', { name: 'Select your State Affiliation' })
    ).toBeTruthy();
  });

  xtest('renders correctly for admin user, requests a new affiliation', async () => {
    fetchMock.onGet('/affiliations/me').reply(200, []);
    fetchMock.onPost('/states/al/affiliations').reply(200);

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
