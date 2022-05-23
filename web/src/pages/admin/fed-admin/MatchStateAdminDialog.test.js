import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../util/api';
import userEvent from '@testing-library/user-event';

import MatchStateAdminDialog from './MatchStateAdminDialog';

const defaultProps = {
  certification: {
    state: 'ak',
    name: 'Sally Shire',
    phone: '431-231-5548',
    email: 'sally@shire.com',
    id: 'placeholder',
    ffy: 2022
  },
  hideModal: jest.fn()
};

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });
const setup = (props = {}) => {
  return renderWithConnection(
    <MatchStateAdminDialog {...defaultProps} {...props} />
  );
};

describe('<MatchStateAdminDialog />', () => {
  test('renders correctly', () => {
    setup();
    fetchMock
      .onGet('/states/ak/affiliations?matches=true')
      .reply(200, [{ email: 'sally@shire.com', displayName: 'Sally Shire' }]);

    expect(screen.getByText('Match State Admin Letter to User')).toBeTruthy();
  });
  test('Matches state admin letter to user', () => {
    setup();
    fetchMock
      .onGet('/states/ak/affiliations?matches=true')
      .reply(200, [{ email: 'sally@shire.com', displayName: 'Sally Shire' }]);

    userEvent.click(
      screen.getByRole('button', { name: 'Match and Approve Access' })
    );
    fetchMock.onPut('/auth/certifications').reply(200);

    expect(screen.getByText('Sally Shire')).toBeTruthy();
  });
});
