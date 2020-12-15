import React from 'react';

import { act } from 'react-dom/test-utils';

import { renderWithConnection } from 'apd-testing-library';
import { plain as StateAdmin } from './StateAdmin';

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
      expect(getAllByText('No results')).toHaveLength(3);
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
      act(() => {
        renderUtils = renderWithConnection(<StateAdmin {...props} />);
      });
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

    test('renders name, email, phone', () => {
      // Note: we render the affiliations in each tab and update on tab change, so we
      // expect to see 3 instances which is why this is using getAllByText
      const { getAllByText } = renderUtils;
      expect(getAllByText(requestedAffiliation.displayName)).toBeTruthy();
      expect(getAllByText(requestedAffiliation.email)).toBeTruthy();
      expect(getAllByText(requestedAffiliation.primaryPhone)).toBeTruthy();
    });

    test('renders approve and deny buttons', () => {
      const { getByText } = renderUtils;
      expect(getByText('Approve')).toBeTruthy();
      expect(getByText('Deny')).toBeTruthy();
    });
  });
});
