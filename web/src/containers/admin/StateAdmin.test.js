import React from 'react';

import { renderWithConnection, userEvent, screen, waitFor } from 'apd-testing-library';

import {
  plain as StateAdmin,
  mapStateToProps,
  mapDispatchToProps
} from './StateAdmin';

import {
  getStateAffiliations,
  updateStateAffiliation,
  getRoleTypes
} from '../../actions/admin';

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

describe('<StateAdmin />', () => {
  describe('with no affiliations', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        affiliations: [],
        getRoleTypes: jest.fn(),
        getStateAffiliations: jest.fn(),
        updateStateAffiliation: jest.fn()
      };
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders no results message', () => {
      expect(screen.getAllByText('No users on this tab at this time')).toHaveLength(3);
    });

    test('renders header', () => {
      expect(
        screen.getByText('Maryland eAPD State Administrator Portal')
      ).toBeInTheDocument();
    });

    test('renders correct tabs', () => {
      expect(screen.getByText('Requests')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
  });

  describe('with a pending request', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        affiliations: [requestedAffiliation],
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        getRoleTypes: jest.fn(),
        getStateAffiliations: jest.fn(),
        updateStateAffiliation: jest.fn()
      };
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone', () => {
      // Note: we render the affiliations in each tab and update on tab change, so we
      // expect to see 3 instances which is why this is using getAllByText
      expect(screen.getAllByText(requestedAffiliation.displayName)).toHaveLength(3);
      expect(screen.getAllByText(requestedAffiliation.email)).toHaveLength(3);
      expect(screen.getAllByText(requestedAffiliation.primaryPhone)).toHaveLength(3);
    });

    test('renders approve and deny buttons', () => {
      expect(screen.getByText('Approve')).toBeInTheDocument();
      expect(screen.getByText('Deny')).toBeInTheDocument();
    });

    it('should open manage modal on approve', async () => {
      userEvent.click(screen.getByText('Approve'));
      await waitFor(() => {
        expect(screen.getByText('Edit Permissions')).toBeInTheDocument();
      });
    });

    it('should open confirmation modal on deny', async () => {
      userEvent.click(screen.getByText('Deny'));
      await waitFor(() => {
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });
  });

  describe('with an active affiliation', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        affiliations: [activeAffiliation],
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        getRoleTypes: jest.fn(),
        getStateAffiliations: jest.fn(),
        updateStateAffiliation: jest.fn()
      };
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, role', () => {
      expect(screen.getAllByText(activeAffiliation.displayName)).toHaveLength(3);
      expect(screen.getAllByText(activeAffiliation.email)).toHaveLength(3);
      expect(screen.getAllByText(activeAffiliation.primaryPhone)).toHaveLength(3);
      // Only show role in the active tab
      expect(screen.getAllByText(activeAffiliation.role)).toBeInTheDocument();
    });

    test('renders edit role and revoke buttons', () => {
      expect(screen.getByText('Edit Role')).toBeInTheDocument();
      expect(screen.getByText('Revoke')).toBeInTheDocument();
    });

    it('should open manage modal on Edit Role', async () => {
      userEvent.click(screen.getByText('Edit Role'));
      await waitFor(() => {
        expect(screen.getByText('Edit Permissions')).toBeInTheDocument();
      });
    });

    it('should open confirmation modal on revoke', async () => {
      userEvent.click(screen.getByText('Revoke'));
      await waitFor(() => {
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });
  });

  describe('with an inactive affiliation', () => {
    beforeEach(() => {
      const props = {
        currentState: {
          id: 'md',
          name: 'Maryland'
        },
        affiliations: [inactiveAffiliation],
        roleTypes: [{ id: 50, name: 'eAPD Federal Admin' }],
        getRoleTypes: jest.fn(),
        getStateAffiliations: jest.fn(),
        updateStateAffiliation: jest.fn()
      };
      renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, status', () => {
      expect(screen.getAllByText(inactiveAffiliation.displayName)).toHaveLength(3);
      expect(screen.getAllByText(inactiveAffiliation.email)).toHaveLength(3);
      expect(screen.getAllByText(inactiveAffiliation.primaryPhone)).toHaveLength(3);
      // Only show status in the active tab
      expect(screen.getAllByText(inactiveAffiliation.status)).toBeInTheDocument();
    });

    test('renders restore access button', () => {
      expect(screen.getByText('Restore Access')).toBeInTheDocument();
    });

    it('should open manage modal on Restore Access', async () => {
      userEvent.click(screen.getByText('Restore Access'));
      await waitFor(() => {
        expect(screen.getByText('Edit Permissions')).toBeInTheDocument();
      });
    });
  });

  describe('events', () => {
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
        getStateAffiliations,
        updateStateAffiliation,
        getRoleTypes
      });
    });
  });
});
