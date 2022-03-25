import React from 'react';
import { render } from 'apd-testing-library';
import ManageAllUsersTable from './ManageAllUsersTable';

let props;
let renderResult;

const mockSingleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 14,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: "eAPD Federal Admin",
  secondEmail: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: "eAPD State Contractor",
      stateId: "md",
      status: "approved",
      id: 14
    }
  ]
};

const mockMultipleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 2,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: "eAPD Federal Admin",
  secondEmail: null,
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: "eAPD State Contractor",
      stateId: "md",
      status: "approved",
      id: 2
    },
    {
      role: "eAPD State Contractor",
      stateId: "la",
      status: "approved",
      id: 12
    }
  ]
};

const mockFedAffiliation = {
  displayName: 'Fed Admin',
  email: 'fed@admin.com',
  id: 3,
  mobilePhone: null,
  primaryPhone: '4045555555',
  role: "eAPD Federal Admin",
  secondEmail: null,
  stateId: 'fd',
  status: 'approved',
  userId: '3',
  affiliations: [
    {
      role: "eAPD Federal Admin",
      stateId: "fd",
      status: "approved",
      id: 3
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
    renderResult = render(<ManageAllUsersTable {...props} />);

    const { getByText } = renderResult;
    expect(getByText('Loading...')).toBeTruthy();
  });


  test('renders correctly for users with single affiliations', () => {
    props = {
      tab: 'pending',
      affiliations: [mockSingleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);
    expect(renderResult).toMatchSnapshot();
  });
  
  test('renders correctly for users with multiple affiliations', () => {
    props = {
      tab: 'active',
      affiliations: [mockMultipleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);
    expect(renderResult).toMatchSnapshot();
  });
  
  test('renders correctly with both single and multi-affiliation users', () => {
    props = {
      tab: 'active',
      affiliations: [mockSingleAffiliation, mockMultipleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);
    expect(renderResult).toMatchSnapshot();
  });

  test('renders passed in actions', () => {
    props = {
      tab: 'pending',
      affiliations: [mockSingleAffiliation],
      isFetching: false,
      actions: [
        <button type="button" key="action1">
          Take Action
        </button>
      ],
      currentUser: { id: '1234', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);

    const { getByText } = renderResult;
    expect(getByText('Take Action')).toBeTruthy();
  });

  test('does not render actions for ones own affiliation', () => {
    props = {
      tab: 'active',
      affiliations: [mockFedAffiliation],
      isFetching: false,
      actions: [
        <button type="button" key="action1">
          Take Action
        </button>
      ],
      currentUser: { id: '3', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);

    const { queryByText } = renderResult;
    expect(queryByText('Take Action')).not.toBeInTheDocument();
  });
  
  test('does not render edit action for active affiliations', () => {
    props = {
      tab: 'active',
      affiliations: [mockFedAffiliation],
      isFetching: false,
      actions: [
        <button type="button" key="action1">
          Edit Role
        </button>,
        <button type="button" key="action1">
          Revoke
        </button>
      ],
      currentUser: { id: '42', activities: ['edit-affiliations'] }
    };
    renderResult = render(<ManageAllUsersTable {...props} />);

    const { queryByText } = renderResult;
    expect(queryByText('Edit Role')).not.toBeInTheDocument();
  });


});
