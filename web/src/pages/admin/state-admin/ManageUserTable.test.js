import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import ManageUserTable from './ManageUserTable';

const requestedAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  role: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297'
};

const approvedAffiliation = {
  displayName: 'Taylor Baylor',
  email: 'taylor@baylor.com',
  id: 24,
  role: 'State Admin',
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvCCC297'
};

const deniedAffiliation = {
  displayName: 'Jimmy Stewart',
  email: 'jimmy@stewart.com',
  id: 24,
  role: 'State Staff',
  stateId: 'md',
  status: 'denied',
  userId: '00u5mfj967KsdvDDD297'
};

const setup = (props = {}) =>
  renderWithConnection(<ManageUserTable {...props} />);

describe('<ManageUserTable />', () => {
  test('shows loading when data is fetching', () => {
    const props = {
      tab: 'active',
      isFetching: true,
      affiliations: [],
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('shows correct table headers in requests tab', () => {
    const props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  test('shows correct table headers in active tab', () => {
    const props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Role')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  test('does now show actions for current users affiliation', () => {
    const props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      currentUser: { id: '00u5mfj967KsdvCCC297' },
      actions: [
        <button type="button" key="edit-role">
          Edit Role
        </button>,
        <button type="button" key="revoke">
          Revoke
        </button>
      ]
    };
    setup(props);
    expect(screen.queryByRole('button', { name: 'Edit Role' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Revoke' })).toBeNull();
  });

  test('shows correct table headers in inactive tab', () => {
    const props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('Actions')).toBeTruthy();
  });

  test('shows correct data in requests tab', () => {
    const props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText(requestedAffiliation.displayName)).toBeTruthy();
    expect(screen.getByText(requestedAffiliation.email)).toBeTruthy();
  });

  test('shows correct data in active tab', () => {
    const props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText(approvedAffiliation.displayName)).toBeTruthy();
    expect(screen.getByText(approvedAffiliation.email)).toBeTruthy();
    expect(screen.getByText(approvedAffiliation.role)).toBeTruthy();
  });

  test('shows correct data in inactive tab', () => {
    const props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText(deniedAffiliation.displayName)).toBeTruthy();
    expect(screen.getByText(deniedAffiliation.email)).toBeTruthy();
    expect(
      screen.getByText(deniedAffiliation.status, { exact: false })
    ).toBeTruthy();
  });

  test('renders passed in actions', () => {
    const props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      actions: [
        <button type="button" key="action1">
          Take Action
        </button>
      ],
      currentUser: { id: '123' }
    };
    setup(props);
    expect(screen.getByText('Take Action')).toBeTruthy();
  });
});
