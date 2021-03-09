import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import ManageUserTable from './ManageUserTable';

let props;

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
  role: 'State Coordinator',
  secondEmail: null,
  stateId: 'md',
  status: 'denied',
  userId: '00u5mfj967KsdvDDD297'
};

describe('<ManageUserTable />', () => {
  test('shows loading when data is fetching', () => {
    props = {
      tab: 'active',
      isFetching: true
    };
    renderWithConnection(<ManageUserTable {...props} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('shows correct table headers in requests tab', () => {
    props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('shows correct table headers in active tab', () => {
    props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('does now show actions for current users affiliation', () => {
    props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false,
      currentUser: { id: '00u5mfj967KsdvCCC297' },
      actions: [
        <button type="button">Edit Role</button>,
        <button type="button">Revoke</button>
      ]
    };
    renderWithConnection(<ManageUserTable {...props} />);
    expect(screen.queryByRole('button', { name: 'Edit Role' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Revoke' })).not.toBeInTheDocument();
  });

  test('shows correct table headers in inactive tab', () => {
    props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('shows correct data in requests tab', () => {
    props = {
      tab: 'pending',
      affiliations: [requestedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText(requestedAffiliation.displayName)).toBeInTheDocument();
    expect(screen.getByText(requestedAffiliation.email)).toBeInTheDocument();
    expect(screen.getByText(requestedAffiliation.primaryPhone)).toBeInTheDocument();
  });

  test('shows correct data in active tab', () => {
    props = {
      tab: 'active',
      affiliations: [approvedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText(approvedAffiliation.displayName)).toBeInTheDocument();
    expect(screen.getByText(approvedAffiliation.email)).toBeInTheDocument();
    expect(screen.getByText(approvedAffiliation.primaryPhone)).toBeInTheDocument();
    expect(screen.getByText(approvedAffiliation.role)).toBeInTheDocument();
  });

  test('shows correct data in inactive tab', () => {
    props = {
      tab: 'inactive',
      affiliations: [deniedAffiliation],
      isFetching: false
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText(deniedAffiliation.displayName)).toBeInTheDocument();
    expect(screen.getByText(deniedAffiliation.email)).toBeInTheDocument();
    expect(screen.getByText(deniedAffiliation.primaryPhone)).toBeInTheDocument();
    expect(screen.getByText(deniedAffiliation.status, { exact: false })).toBeInTheDocument();
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
      ]
    };
    renderWithConnection(<ManageUserTable {...props} />);

    expect(screen.getByText('Take Action')).toBeInTheDocument();
  });
});
