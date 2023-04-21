import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../util/api';
import userEvent from '@testing-library/user-event';

import * as hooks from '../../../util/hooks';
import { STATES } from '../../../util/states';

import MatchStateAdminDialog from './MatchStateAdminDialog';

const defaultProps = {
  certification: {
    state: 'ak',
    name: 'Sally Shire',
    email: 'sally@shire.com',
    id: 'placeholder',
    ffy: 2022
  },
  hideModal: jest.fn()
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const setup = async (props = {}, username = '') => {
  const utils = await renderWithConnection(
    <MatchStateAdminDialog {...defaultProps} {...props} />,
    {
      initialState: {
        user: {
          data: {
            username
          }
        }
      }
    }
  );
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

describe('<MatchStateAdminDialog />', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'useAvailableStates').mockImplementation(() => STATES);
  });
  it('renders correctly', () => {
    setup();
    fetchMock.onGet('/states/ak/affiliations').reply(200, [
      {
        id: 322,
        stateId: 'ak',
        displayName: 'Sally Shire',
        email: 'sally@shire.com'
      }
    ]);
    expect(screen.getByText('Match State Admin Letter to User')).toBeTruthy();
  });

  it('renders select dropdown', () => {
    setup();
    fetchMock.onGet('/states/ak/affiliations').reply(200, [
      {
        id: 322,
        stateId: 'ak',
        displayName: 'Sally Shire',
        email: 'sally@shire.com'
      }
    ]);
    expect(
      screen.getByRole('combobox', { name: 'Select User' })
    ).toBeInTheDocument();
  });
});
