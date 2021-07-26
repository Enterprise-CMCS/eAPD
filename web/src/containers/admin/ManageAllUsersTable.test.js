import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import ManageAllUsersTable from './ManageAllUsersTable';

let props;
let render;

const mockAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 24,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: null,
  secondEmail: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: "eAPD State Contractor",
      stateId: "la",
      status: "approved",
      id: 417
    }
  ]
};

describe('<ManageAllUsersTable />', () => {
  test('shows loading when data is fetching', () => {
    props = {
      tab: 'active',
      isFetching: true,
      affiliations: [],
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    render = renderWithConnection(<ManageAllUsersTable {...props} />);

    const { getByText } = render;
    expect(getByText('Loading...')).toBeTruthy();
  });


  test('shows correct table headers for requests', () => {
    props = {
      tab: 'pending',
      affiliations: [mockAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    render = renderWithConnection(<ManageAllUsersTable {...props} />);

    const { getByText } = render;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('State')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('shows correct table headers for active', () => {
    props = {
      tab: 'active',
      affiliations: [mockAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    render = renderWithConnection(<ManageAllUsersTable {...props} />);

    const { getByText } = render;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('State')).toBeTruthy();
    expect(getByText('Role')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('shows correct table headers for inactive', () => {
    props = {
      tab: 'inactive',
      affiliations: [mockAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    render = renderWithConnection(<ManageAllUsersTable {...props} />);

    const { getByText } = render;
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Phone Number')).toBeTruthy();
    expect(getByText('State')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  test('renders passed in actions', () => {
    props = {
      tab: 'active',
      affiliations: [mockAffiliation],
      isFetching: false,
      actions: [
        <button type="button" key="action1">
          Take Action
        </button>
      ],
      currentUser: { id: '1234', activities: ['edit-affiliations'] }
    };
    render = renderWithConnection(<ManageAllUsersTable {...props} />);

    const { getByText } = render;
    expect(getByText('Take Action')).toBeTruthy();
  });
});
