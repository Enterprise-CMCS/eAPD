import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../util/api';
// import userEvent from '@testing-library/user-event';

import ManageAccount from './ManageAccount';

const regularUser = {
  user: {
    data: {
      state: {
        id: 'ak',
        name: 'Alaska',
        medicaid_office: {
          medicaidDirector: {
            name: 'Cornelius Fudge',
            email: 'c.fudge@ministry.magic',
            phone: '5551234567'
          },
          medicaidOffice: {
            address1: '100 Round Sq',
            address2: '',
            city: 'Cityville',
            state: 'AK',
            zip: '12345'
          }
        }
      },
      activities: ['edit-document']
    }
  }
};

const adminUser = {
  data: {
    role: 'eAPD State Admin',
    state: {
      id: 'md',
      name: 'Maryland',
      medicaid_office: {
        medicaidDirector: {
          name: 'Cornelius Fudge',
          email: 'c.fudge@ministry.magic',
          phone: '5551234567'
        },
        medicaidOffice: {
          address1: '100 Round Sq',
          address2: '',
          city: 'Cityville',
          state: 'AK',
          zip: '12345'
        }
      }
    }
  }
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const setup = (props = {}, options = {}) => {
  return renderWithConnection(<ManageAccount {...props} />, options);
};

describe('<ManageAccount />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  test('renders correctly for regular user', () => {
    const props = {
      createAccessRequest: jest.fn(),
      completeAccessRequest: jest.fn(),
      error: 'This is an error',
      isAdmin: false,
      currentUser: regularUser,
      dashboard: jest.fn()
    };

    setup(props, { initialHistory: ['/'] });
    fetchMock.onGet('/affiliations/me').reply(200, []);

    expect(
      screen.getByRole('heading', { name: 'Select your State Affiliation' })
    ).toBeTruthy();
  });

  test('renders correctly for admin user', () => {
    const props = {
      createAccessRequest: jest.fn(),
      completeAccessRequest: jest.fn(),
      error: 'This is an error',
      dashboard: jest.fn()
    };

    setup(props, {
      initialState: {
        user: adminUser,
        isAdmin: true
      },
      initialHistory: ['/']
    });
    fetchMock.onGet('/affiliations/me').reply(200, []);

    expect(
      screen.getByRole('heading', { name: 'Select your State Affiliation' })
    ).toBeTruthy();
    // screen.getByRole('bla');
  });
});
