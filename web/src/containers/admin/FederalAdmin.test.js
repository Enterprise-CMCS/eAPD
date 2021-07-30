import React from 'react';

import {
  renderWithConnection,
  screen,
  waitFor,
  fireEvent
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
      },
      activities: [
        'edit-affiliations'
      ]
    }
  }
};

const mockSingleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'la',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 24
    }
  ]
};

const mockMultiAffiliation = {
  displayName: 'Bob Barker',
  email: 'bob@barker.com',
  id: 26,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'md',
      status: 'approved',
      id: 26
    },
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 31
    }
  ]
};


const mockPendingAffiliation = {
  displayName: 'Sir Pending',
  email: 'sir@pending.com',
  id: 42,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'la',
  status: 'pending',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: null,
      stateId: 'la',
      status: 'pending',
      id: 42
    }
  ]
};

describe('<FederalAdmin />', () => {

  describe('with no affiliations', () => {
    beforeEach(() => {
      fetchMock.reset();
      fetchMock.onGet(`/states/fd/affiliations`).reply(200, []);
      renderWithConnection(<FederalAdmin />, {
        initialState
      });
    });

    test('renders no results message', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText('No users on this tab at this time')
        ).toBeTruthy();
      });
    });

    test('renders correct tabs', async () => {
      await waitFor(() => {
        expect(screen.getByText('Requests')).toBeTruthy();
        expect(screen.getByText('Active')).toBeTruthy();
        expect(screen.getByText('Inactive')).toBeTruthy();
      });
    });
  });

  describe('with a single active affiliations', () => {
    beforeEach(() => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=pending`)
        .reply(200, [mockSingleAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });

    it('renders name, email, phone, state', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText(mockSingleAffiliation.displayName)
        ).toBeTruthy();
      });
    });

    it('renders sub affiliation state', async () => {
      await waitFor(() => {
        expect(screen.getAllByText('LA')).toBeTruthy();
      });
    });
  });

  describe('with multiple affiliations', () => {
    beforeEach(() => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=pending`)
        .reply(200, [mockSingleAffiliation, mockMultiAffiliation]);
      renderWithConnection(<FederalAdmin  />, {
        initialState
      });
    });

    it('renders name, email, phone, state', async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText(mockMultiAffiliation.displayName)
        ).toBeTruthy();
      });
    });

    it('renders sub affiliation state', async () => {
      await waitFor(() => {
        expect(screen.getAllByText('LA')).toBeTruthy();
      });
    });
  });
});
