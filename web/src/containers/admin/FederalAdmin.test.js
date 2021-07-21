import React from 'react';

import {
  renderWithConnection,
  screen,
  waitFor
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../util/api';
import FederalAdmin from './FederalAdmin';

const fetchMock = new MockAdapter(axios);

const initialState = {
  admin: {
    roleTypes: [
      {
        id: 1,
        name: 'eAPD State Staff'
      },
      {
        id: 2,
        name: 'eAPD State Contractor'
      }
    ],
    affiliations: []
  },
  auth: {
    user: {
      id: '12345',
      name: 'Tester'
    }
  },
  user: {
    data: {
      state: {
        id: 'fd',
        name: 'Federal'
      }
    }
  }
};

const mockAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: "eAPD State Contractor",
      stateId: "la",
      status: "approved",
      id: 417
    }
  ]
};

describe('<FederalAdmin />', () => {

  describe('with no affiliations', () => {
    beforeEach(() => {

      fetchMock.onGet(`/states/fd/affiliations`).reply(200, []);
      renderWithConnection(<FederalAdmin />, {
        initialState
      });
    });

    test('renders no results message', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText('No users on this tab at this time')
        ).toHaveLength(3);
      });
    });

    test('renders correct tabs', async () => {
      await waitFor(() => {
        expect(screen.getByText('Requests')).toBeTruthy();
      });
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText('Inactive')).toBeTruthy();
    });
  });

  describe('with affiliations', () => {
    beforeEach(() => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=pending`)
        .reply(200, [mockAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });

    it('renders name, email, phone, state', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText(mockAffiliation.displayName)
        ).toHaveLength(3);
      });
    });

    it('renders sub affiliation state', async () => {
      await waitFor(() => {
        expect(screen.getAllByText('LA')).toHaveLength(3);
      });
    });
  });
});
