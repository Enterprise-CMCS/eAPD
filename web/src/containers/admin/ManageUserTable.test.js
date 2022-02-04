import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import ManageUserTable from './ManageUserTable';

let props;
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

const approvedAffiliation = {
  displayName: 'Taylor Baylor',
  email: 'taylor@baylor.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: 'State Admin',
  secondEmail: null,
  stateId: 'md',
  status: 'approved',
  userId: '00u5mfj967KsdvCCC297'
};

const deniedAffiliation = {
  displayName: 'Jimmy Stewart',
  email: 'jimmy@stewart.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: 'State Staff',
  secondEmail: null,
  stateId: 'md',
  status: 'denied',
  userId: '00u5mfj967KsdvDDD297'
};

describe('<ManageUserTable />', () => {
  test('shows loading when data is fetching', () => {
    props = {
      tab: 'active',
      isFetching: true,
      affiliations: [],
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Loading...')).toBeTruthy();
  });

  test('shows correct table headers in requests tab', () => {
    props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('shows correct table headers in active tab', () => {
    props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('Role')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('does now show actions for current users affiliation', () => {
    props = {
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
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);
    const { queryByRole } = renderUtils;
    expect(queryByRole('button', { name: 'Edit Role' })).toBeNull();
    expect(queryByRole('button', { name: 'Revoke' })).toBeNull();
  });

  test('shows correct table headers in inactive tab', () => {
    props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('shows correct data in requests tab', () => {
    props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText(requestedAffiliation.displayName)).toBeTruthy();
    expect(getByText(requestedAffiliation.email)).toBeTruthy();
    expect(getByText(requestedAffiliation.primaryPhone)).toBeTruthy();
  });

  test('shows correct data in active tab', () => {
    props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText(approvedAffiliation.displayName)).toBeTruthy();
    expect(getByText(approvedAffiliation.email)).toBeTruthy();
    expect(getByText(approvedAffiliation.primaryPhone)).toBeTruthy();
    expect(getByText(approvedAffiliation.role)).toBeTruthy();
  });

  test('shows correct data in inactive tab', () => {
    props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123' }
    };
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText(deniedAffiliation.displayName)).toBeTruthy();
    expect(getByText(deniedAffiliation.email)).toBeTruthy();
    expect(getByText(deniedAffiliation.primaryPhone)).toBeTruthy();
    expect(getByText(deniedAffiliation.status, { exact: false })).toBeTruthy();
  });

  test('renders passed in actions', () => {
    props = {
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
    renderUtils = renderWithConnection(<ManageUserTable {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Take Action')).toBeTruthy();
  });
});
