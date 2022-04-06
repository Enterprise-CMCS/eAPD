import React from 'react';

import {
  renderWithConnection,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../util/api';
import StateAdmin, { mapStateToProps, mapDispatchToProps } from './StateAdmin';
import {
  getAffiliations,
  updateAffiliation,
  getRoleTypes
} from '../../../actions/admin';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const requestedAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297'
};

const activeAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: 'eAPD State Admin',
  secondEmail: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvBBB297'
};

const inactiveAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
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
    affiliations: [requestedAffiliation, activeAffiliation, inactiveAffiliation]
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
      }
    }
  }
};

describe('<StateAdmin />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('with no affiliations', () => {
    beforeEach(async () => {
      const props = {
        getRoleTypes: jest.fn(),
        getAffiliations: jest.fn(),
        updateAffiliation: jest.fn()
      };

      const stateId = initialState.user.data.state.id;
      fetchMock.onGet('/roles').reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=active`)
        .reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=inactive`)
        .reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=pending`)
        .reply(200, []);
      renderWithConnection(<StateAdmin {...props} />, {
        initialState: {
          ...initialState,
          admin: {
            ...initialState.admin,
            affiliations: []
          }
        }
      });

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Loading...')[0]
      );
    });

    it('renders no results message', () => {
      expect(
        screen.getAllByText('No users on this tab at this time')
      ).toHaveLength(3);
    });

    it('renders header', () => {
      expect(
        screen.getByText('Maryland eAPD State Administrator Portal')
      ).toBeTruthy();
    });

    it('renders correct tabs', () => {
      expect(screen.getByText('Requests')).toBeTruthy();
      expect(screen.getByText('Active')).toBeTruthy();
      expect(screen.getByText('Inactive')).toBeTruthy();
    });
  });

  describe('with a pending request', () => {
    beforeEach(async () => {
      const props = {
        getRoleTypes: jest.fn(),
        getAffiliations: jest.fn(),
        updateAffiliation: jest.fn()
      };
      const stateId = initialState.user.data.state.id;
      fetchMock.onGet('/roles').reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=active`)
        .reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=inactive`)
        .reply(200, []);
      fetchMock
        .onGet(`/states/${stateId}/affiliations?status=pending`)
        .reply(200, [requestedAffiliation]);
      fetchMock
        .onPatch(`/states/${stateId}/affiliations/${requestedAffiliation.id}`)
        .reply(200);
      renderWithConnection(<StateAdmin {...props} />, {
        initialState
      });

      await waitForElementToBeRemoved(
        () => screen.getAllByText('Loading...')[0]
      );
    });

    it('renders name, email, phone', async () => {
      // Note: we render the affiliations in each tab and update on tab change, so we
      // expect to see 3 instances which is why this is using getAllByText
      expect(
        screen.getAllByText(requestedAffiliation.displayName)
      ).toHaveLength(3);
      expect(screen.getAllByText(requestedAffiliation.email)).toHaveLength(3);
      expect(
        screen.getAllByText(requestedAffiliation.primaryPhone)
      ).toHaveLength(3);
    });

    it('renders approve and deny buttons', async () => {
      expect(screen.getByText('Approve')).toBeTruthy();
      expect(screen.getByText('Deny')).toBeTruthy();
    });

    it('should open manage modal on approve', async () => {
      expect(screen.getByText('Approve')).toBeTruthy();
      fireEvent.click(screen.getByText('Approve'));
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Edit Role' })
        ).toBeInTheDocument();
      });
    });
  });

  xdescribe('with an active affiliation', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        affiliations: [activeAffiliation],
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        getRoleTypes: jest.fn(),
        getAffiliations: jest.fn(),
        updateAffiliation: jest.fn()
      };
      fetchMock.onGet('/roles').reply(200, []);
      fetchMock
        .onGet(`/states/md/affiliations?status=pending`)
        .reply(200, [requestedAffiliation]);
      fetchMock
        .onPatch(`/states/md/affiliations/${requestedAffiliation.id}`)
        .reply(200);
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, role', () => {
      expect(screen.getAllByText(activeAffiliation.displayName)).toHaveLength(
        3
      );
      expect(screen.getAllByText(activeAffiliation.email)).toHaveLength(3);
      expect(screen.getAllByText(activeAffiliation.primaryPhone)).toHaveLength(
        3
      );
      // Only show role in the active tab
      expect(screen.getAllByText(activeAffiliation.role)).toHaveLength(1);
    });

    test('renders edit role and revoke buttons', () => {
      expect(screen.getByText('Edit Role')).toBeTruthy();
      expect(screen.getByText('Revoke')).toBeTruthy();
    });

    it('should open manage modal on Edit Role', async () => {
      fireEvent.click(screen.getByText('Edit Role'));
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Edit Role' })
        ).toBeInTheDocument();
      });
    });

    it('should open confirmation modal on revoke', async () => {
      fireEvent.click(screen.getByText('Revoke'));
      await waitFor(() => {
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });
  });

  xdescribe('with an inactive affiliation', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        affiliations: [inactiveAffiliation],
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        getRoleTypes: jest.fn(),
        getAffiliations: jest.fn(),
        updateAffiliation: jest.fn()
      };
      fetchMock.onGet('/roles').reply(200, []);
      fetchMock
        .onGet(`/states/md/affiliations?status=pending`)
        .reply(200, [requestedAffiliation]);
      fetchMock
        .onPatch(`/states/md/affiliations/${requestedAffiliation.id}`)
        .reply(200);
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, status', () => {
      expect(screen.getAllByText(inactiveAffiliation.displayName)).toHaveLength(
        3
      );
      expect(screen.getAllByText(inactiveAffiliation.email)).toHaveLength(3);
      expect(
        screen.getAllByText(inactiveAffiliation.primaryPhone)
      ).toHaveLength(3);
      // Only show status in the active tab
      expect(screen.getAllByText(inactiveAffiliation.status)).toHaveLength(1);
    });

    test('renders restore access button', () => {
      expect(screen.getByText('Restore Access')).toBeTruthy();
    });

    it('should open manage modal on Restore Access', async () => {
      fireEvent.click(screen.getByText('Restore Access'));
      await waitFor(() => {
        expect(
          screen.getByRole('heading', { name: 'Edit Role' })
        ).toBeInTheDocument();
      });
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
