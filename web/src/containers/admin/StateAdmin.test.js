import React from 'react';

import { renderWithConnection, fireEvent, waitFor } from 'apd-testing-library';

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

let renderUtils;

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
      renderUtils = renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders no results message', () => {
      const { getAllByText } = renderUtils;
      expect(getAllByText('No users in this tab')).toHaveLength(3);
    });

    test('renders header', () => {
      const { getByText } = renderUtils;
      expect(
        getByText('Maryland eAPD State Administrator Portal')
      ).toBeTruthy();
    });

    test('renders correct tabs', () => {
      const { getByText } = renderUtils;
      expect(getByText('Requests')).toBeTruthy();
      expect(getByText('Active')).toBeTruthy();
      expect(getByText('Inactive')).toBeTruthy();
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
      renderUtils = renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone', () => {
      // Note: we render the affiliations in each tab and update on tab change, so we
      // expect to see 3 instances which is why this is using getAllByText
      const { getAllByText } = renderUtils;
      expect(getAllByText(requestedAffiliation.displayName)).toHaveLength(3);
      expect(getAllByText(requestedAffiliation.email)).toHaveLength(3);
      expect(getAllByText(requestedAffiliation.primaryPhone)).toHaveLength(3);
    });

    test('renders approve and deny buttons', () => {
      const { getByText } = renderUtils;
      expect(getByText('Approve')).toBeTruthy();
      expect(getByText('Deny')).toBeTruthy();
    });

    it('should open manage modal on approve', async () => {
      const { getByText } = renderUtils;
      fireEvent.click(getByText('Approve'));
      await waitFor(() => {
        expect(getByText('Edit Permissions')).toBeInTheDocument();
      });
    });

    it('should open confirmation modal on deny', async () => {
      const { getByText } = renderUtils;
      fireEvent.click(getByText('Deny'));
      await waitFor(() => {
        expect(getByText('Confirm')).toBeInTheDocument();
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
      renderUtils = renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, role', () => {
      const { getAllByText } = renderUtils;
      expect(getAllByText(activeAffiliation.displayName)).toHaveLength(3);
      expect(getAllByText(activeAffiliation.email)).toHaveLength(3);
      expect(getAllByText(activeAffiliation.primaryPhone)).toHaveLength(3);
      // Only show role in the active tab
      expect(getAllByText(activeAffiliation.role)).toHaveLength(1);
    });

    test('renders edit role and revoke buttons', () => {
      const { getByText } = renderUtils;
      expect(getByText('Edit Role')).toBeTruthy();
      expect(getByText('Revoke')).toBeTruthy();
    });

    it('should open manage modal on Edit Role', async () => {
      const { getByText } = renderUtils;
      fireEvent.click(getByText('Edit Role'));
      await waitFor(() => {
        expect(getByText('Edit Permissions')).toBeInTheDocument();
      });
    });

    it('should open confirmation modal on revoke', async () => {
      const { getByText } = renderUtils;
      fireEvent.click(getByText('Revoke'));
      await waitFor(() => {
        expect(getByText('Confirm')).toBeInTheDocument();
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
      renderUtils = renderWithConnection(<StateAdmin {...props} />);
    });

    test('renders name, email, phone, status', () => {
      const { getAllByText } = renderUtils;
      expect(getAllByText(inactiveAffiliation.displayName)).toHaveLength(3);
      expect(getAllByText(inactiveAffiliation.email)).toHaveLength(3);
      expect(getAllByText(inactiveAffiliation.primaryPhone)).toHaveLength(3);
      // Only show status in the active tab
      expect(getAllByText(inactiveAffiliation.status)).toHaveLength(1);
    });

    test('renders restore access button', () => {
      const { getByText } = renderUtils;
      expect(getByText('Restore Access')).toBeTruthy();
    });

    it('should open manage modal on Restore Access', async () => {
      const { getByText } = renderUtils;
      fireEvent.click(getByText('Restore Access'));
      await waitFor(() => {
        expect(getByText('Edit Permissions')).toBeInTheDocument();
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
