import React from 'react';

import {
  renderWithConnection,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
  within
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../util/api';
import FederalAdmin from './FederalAdmin';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const initialState = {
  admin: {
    roleTypes: [
      {
        id: 1,
        name: 'eAPD State Admin'
      },
      {
        id: 2,
        name: 'eAPD Federal Admin'
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
      activities: ['edit-affiliations']
    }
  }
};

const mockSingleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 1,
  role: null,
  stateId: 'la',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 1
    }
  ]
};

const mockMultiAffiliation = {
  displayName: 'Bob Barker',
  email: 'bob@barker.com',
  id: 2,
  role: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'md',
      status: 'approved',
      id: 2
    },
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 3
    }
  ]
};

const mockPendingAffiliation = {
  displayName: 'Sir Pending',
  email: 'sir@pending.com',
  id: 4,
  role: null,
  stateId: 'la',
  status: 'pending',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: null,
      stateId: 'la',
      status: 'pending',
      id: 4
    }
  ]
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<FederalAdmin {...props} />, options);

const loadTab = async tab => {
  fireEvent.click(screen.getByRole('tab', { name: tab }));
  await waitForElementToBeRemoved(() =>
    within(screen.getByRole('tabpanel', { name: tab })).queryByText(
      'Loading...'
    )
  );
};

describe('<FederalAdmin />', () => {
  beforeEach(() => {
    fetchMock.resetHistory();
    fetchMock.onGet('/roles').reply(200, []);
    fetchMock.onGet(`/auth/certifications`).reply(200, []);
    fetchMock.onGet(`/states/fd/affiliations`).reply(200, []);
  });
  describe('with no affiliations', () => {
    beforeEach(async () => {
      fetchMock.onGet(`/states/fd/affiliations?status=pending`).reply(200, []);
    });

    it('should render no results message', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Requests');
      expect(
        screen.getAllByText('No users on this tab at this time')
      ).toBeTruthy();
    });

    it('should render correct tabs', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Requests');
      expect(screen.getByText('Requests')).toBeTruthy();
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText('Inactive')).toBeTruthy();
    });
  });

  describe('with a requested affiliation', () => {
    beforeEach(async () => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=pending`)
        .reply(200, [mockPendingAffiliation]);
    });

    it('renders the user in the affiliation table', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Requests');
      expect(screen.getByText(mockPendingAffiliation.displayName)).toBeTruthy();
    });

    xit('shows edit role dialog when clicking approve', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Requests');
      fireEvent.click(screen.getByText('Approve'));
      expect(screen.getByRole('heading', { name: 'Edit Role' })).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.queryByRole('heading', { name: 'Edit Role' })).toBeNull();
    });

    xit('shows confirmation dialog when clicking deny', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Requests');
      fireEvent.click(screen.getByText('Deny'));
      expect(screen.getByRole('heading', { name: 'Deny' })).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(screen.queryByRole('heading', { name: 'Deny' })).toBeNull();
    });
  });

  describe('with a single active affiliations', () => {
    beforeEach(async () => {
      fetchMock.onGet(`/states/fd/affiliations?status=pending`).reply(200, []);
      fetchMock
        .onGet(`/states/fd/affiliations?status=active`)
        .reply(200, [mockSingleAffiliation]);
    });

    it('renders the affiliation in the active tab', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Active');
      expect(
        screen.getAllByText(mockSingleAffiliation.displayName)
      ).toBeTruthy();
    });

    it('renders sub affiliation state', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Active');
      expect(screen.getAllByText('LA')).toBeTruthy();
    });
  });

  describe('with multiple users', () => {
    fetchMock.onGet(`/states/fd/affiliations?status=pending`).reply(200, []);
    beforeEach(async () => {
      fetchMock
        .onGet(`/states/fd/affiliations?status=active`)
        .reply(200, [mockSingleAffiliation, mockMultiAffiliation]);
    });

    it('renders both users', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Active');
      expect(
        await screen.findAllByText(mockSingleAffiliation.displayName)
      ).toBeTruthy();
      expect(
        screen.getAllByText(mockMultiAffiliation.displayName)
      ).toBeTruthy();
    });

    it('renders sub affiliations state', async () => {
      setup(
        {},
        {
          initialState
        }
      );
      await loadTab('Active');
      expect(screen.getAllByText('LA')).toHaveLength(2);
    });
  });
});
