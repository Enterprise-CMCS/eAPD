import React from 'react';

import {
  renderWithConnection,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../util/api';
import StateAdmin, { mapStateToProps, mapDispatchToProps } from './StateAdmin';
import {
  getAffiliations,
  updateAffiliation,
  getRoleTypes
} from '../../../redux/actions/admin';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const requestedAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  role: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297'
};

const activeAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  role: 'eAPD State Admin',
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297'
};

const inactiveAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  role: null,
  stateId: 'md',
  status: 'Revoked',
  userId: '00u5mfj967KsdvBBB297'
};

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
        id: 'md',
        name: 'Maryland'
      },
      activities: ['edit-affiliations']
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<StateAdmin {...props} />, options);

const loadTab = async tab => {
  fireEvent.click(screen.getByRole('tab', { name: tab }));
  await waitForElementToBeRemoved(() =>
    within(screen.getByRole('tabpanel', { name: tab })).queryByText(
      'Loading...'
    )
  );
};

describe('<StateAdmin />', () => {
  beforeEach(() => {
    fetchMock.resetHistory();
    fetchMock.onGet('/roles').reply(200, []);
    fetchMock
      .onPatch(`/states/md/affiliations/${requestedAffiliation.id}`)
      .reply(200);
  });

  describe('with no affiliations', () => {
    beforeEach(async () => {
      const stateId = initialState.user.data.state.id;
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=pending`)
        .reply(200, []);
    });

    it('renders no results message', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      expect(
        screen.getAllByText('No users on this tab at this time')
      ).toBeTruthy();
    });

    it('renders header', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      expect(
        screen.getByText('Maryland eAPD State Administrator Portal')
      ).toBeTruthy();
    });

    it('renders correct tabs', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      expect(screen.getByText('Requests')).toBeTruthy();
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText('Inactive')).toBeTruthy();
    });
  });

  describe('with a pending request', () => {
    beforeEach(async () => {
      const stateId = initialState.user.data.state.id;
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=pending`)
        .reply(200, [requestedAffiliation]);
    });

    it('renders name and email', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      // Note: we render the affiliations in each tab and update on tab change, so we
      // expect to see 3 instances which is why this is using getAllByText
      expect(
        screen.getAllByText(requestedAffiliation.displayName)
      ).toHaveLength(3);
      expect(screen.getAllByText(requestedAffiliation.email)).toHaveLength(3);
    });

    it('renders approve and deny buttons', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      expect(screen.getByText('Approve')).toBeTruthy();
      expect(screen.getByText('Deny')).toBeTruthy();
    });

    it('should open manage modal on approve', async () => {
      setup({}, { initialState });
      await loadTab('Requests');
      expect(screen.getByText('Approve')).toBeTruthy();
      fireEvent.click(screen.getByText('Approve'));
      expect(
        await screen.findByRole('heading', { name: 'Edit Role' })
      ).toBeInTheDocument();
    });
  });

  describe('with an active affiliation', () => {
    beforeEach(() => {
      const stateId = initialState.user.data.state.id;
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=active`)
        .reply(200, [activeAffiliation]);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=pending`)
        .reply(200, []);
    });

    test('renders name, email, role', async () => {
      setup({}, { initialState });
      await loadTab('Active');
      expect(screen.getAllByText(activeAffiliation.displayName)).toHaveLength(
        3
      );
      expect(screen.getAllByText(activeAffiliation.email)).toHaveLength(3);
      // Only show role in the active tab
      expect(screen.getAllByText(activeAffiliation.role)).toHaveLength(1);
    });

    test('renders edit role and revoke buttons', async () => {
      setup({}, { initialState });
      await loadTab('Active');
      expect(screen.getByText('Edit Role')).toBeTruthy();
      expect(screen.getByText('Revoke')).toBeTruthy();
    });

    it('should open manage modal on Edit Role', async () => {
      setup({}, { initialState });
      await loadTab('Active');
      fireEvent.click(screen.getByText('Edit Role'));
      expect(
        await screen.findByRole('heading', { name: 'Edit Role' })
      ).toBeInTheDocument();
    });

    it('should open confirmation modal on revoke', async () => {
      setup({}, { initialState });
      await loadTab('Active');
      fireEvent.click(screen.getByText('Revoke'));
      expect(await screen.findByText('Confirm')).toBeInTheDocument();
    });
  });

  describe('with an inactive affiliation', () => {
    beforeEach(() => {
      fetchMock.onGet(`/states/md/affiliations?status=pending`).reply(200, []);
      fetchMock
        .onGet(`/states/md/affiliations?status=inactive`)
        .reply(200, [inactiveAffiliation]);
    });

    test('renders name, email, status', async () => {
      setup({}, { initialState });
      await loadTab('Inactive');
      expect(screen.getAllByText(inactiveAffiliation.displayName)).toHaveLength(
        3
      );
      expect(screen.getAllByText(inactiveAffiliation.email)).toHaveLength(3);
      // Only show status in the active tab
      expect(screen.getAllByText(inactiveAffiliation.status)).toHaveLength(1);
    });

    test('renders restore access button', async () => {
      setup({}, { initialState });
      await loadTab('Inactive');
      expect(screen.getByText('Restore Access')).toBeTruthy();
    });

    it('should open manage modal on Restore Access', async () => {
      setup({}, { initialState });
      await loadTab('Inactive');
      fireEvent.click(screen.getByText('Restore Access'));
      expect(
        await screen.findByRole('heading', { name: 'Edit Role' })
      ).toBeInTheDocument();
    });
  });

  xdescribe('events', () => {
    test('maps redux state to component props', () => {
      expect(
        mapStateToProps({
          admin: {
            affiliations: [{ id: 34, stateId: 'md', status: 'requested' }],
            roleTypes: [{ id: 59, name: 'eAPD Federal Admin' }]
          },
          user: {
            data: {
              state: { id: 'md', name: 'Maryland' }
            }
          },
          auth: {
            user: { id: '123' }
          }
        })
      ).toEqual({
        affiliations: [{ id: 34, stateId: 'md', status: 'requested' }],
        roleTypes: [{ id: 59, name: 'eAPD Federal Admin' }],
        currentState: { id: 'md', name: 'Maryland' },
        currentUser: { id: '123' }
      });
    });

    test('maps dispatch actions to props', () => {
      expect(mapDispatchToProps).toEqual({
        getAffiliations,
        updateAffiliation,
        getRoleTypes
      });
    });
  });
});
