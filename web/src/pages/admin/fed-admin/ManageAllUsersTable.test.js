import React from 'react';
import { render, screen } from 'apd-testing-library';
import ManageAllUsersTable from './ManageAllUsersTable';

const mockSingleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 14,
  role: 'eAPD Federal Admin',
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'md',
      status: 'approved',
      id: 14
    }
  ]
};

const mockMultipleAffiliation = {
  displayName: 'Liz Lemon',
  email: 'liz@lemon.com',
  id: 2,
  role: 'eAPD Federal Admin',
  stateId: 'md',
  status: 'requested',
  userId: '00u5mfj967KsdvBBB297',
  affiliations: [
    {
      role: 'eAPD State Contractor',
      stateId: 'md',
      status: 'approved',
      id: 2
    },
    {
      role: 'eAPD State Contractor',
      stateId: 'la',
      status: 'approved',
      id: 12
    }
  ]
};

const mockFedAffiliation = {
  displayName: 'Fed Admin',
  email: 'fed@admin.com',
  id: 3,
  role: 'eAPD Federal Admin',
  stateId: 'fd',
  status: 'approved',
  userId: '3',
  affiliations: [
    {
      role: 'eAPD Federal Admin',
      stateId: 'fd',
      status: 'approved',
      id: 3
    }
  ]
};

const setup = (props = {}) => render(<ManageAllUsersTable {...props} />);

describe('<ManageAllUsersTable />', () => {
  test('shows loading when data is fetching', () => {
    const props = {
      tab: 'active',
      isFetching: true,
      affiliations: [],
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    setup(props);

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('renders correctly for users with single affiliations', () => {
    const props = {
      tab: 'pending',
      affiliations: [mockSingleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    const { container } = setup(props);
    expect(container).toMatchSnapshot();
  });

  test('renders correctly for users with multiple affiliations', () => {
    const props = {
      tab: 'active',
      affiliations: [mockMultipleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    const { container } = setup(props);
    expect(container).toMatchSnapshot();
  });

  test('renders correctly with both single and multi-affiliation users', () => {
    const props = {
      tab: 'active',
      affiliations: [mockSingleAffiliation, mockMultipleAffiliation],
      isFetching: false,
      actions: [],
      currentUser: { id: '123', activities: ['edit-affiliations'] }
    };
    const { container } = setup(props);
    expect(container).toMatchSnapshot();
  });

  test('renders passed in actions', () => {
    const props = {
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
    setup(props);
    expect(screen.getByText('Take Action')).toBeTruthy();
  });

  test('does not render actions for ones own affiliation', () => {
    const props = {
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
    setup(props);
    expect(screen.queryByText('Take Action')).not.toBeInTheDocument();
  });

  test('does not render edit action for active affiliations', () => {
    const props = {
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
    setup(props);
    expect(screen.queryByText('Edit Role')).not.toBeInTheDocument();
  });
});
