import React from 'react';
import { shallow } from 'enzyme';
import ManageRoleDialog from './ManageRoleDialog';

const selectedAffiliation = {
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

describe('<ManageRoleDialog />', () => {
  const props = {
    roleTypes: [{ name: 'State Admin' }, { name: 'State Contractor' }],
    selectedAffiliation,
    hideManageModal: jest.fn(),
    handleAffiliationUpdate: jest.fn()
  };

  test('matches snapshot', () => {
    expect(shallow(<ManageRoleDialog {...props} />)).toMatchSnapshot();
  });

  test('renders dialog box title', () => {
    const component = shallow(<ManageRoleDialog {...props} />);
    expect(component.find('Edit Role')).toBeTruthy();
  });

  test('renders affiliation information', () => {
    const component = shallow(<ManageRoleDialog {...props} />);
    expect(component.find('p').at(0).text()).toEqual(
      `Name ${selectedAffiliation.displayName}`
    );
    expect(component.find('p').at(1).text()).toEqual(
      `Phone Number ${selectedAffiliation.primaryPhone}`
    );
    expect(component.find('p').at(2).text()).toEqual(
      `Email ${selectedAffiliation.email}`
    );
  });

  test('renders save and cancel buttons', () => {
    const component = shallow(<ManageRoleDialog {...props} />);
    expect(component.find('Save')).toBeTruthy();
    expect(component.find('Cancel')).toBeTruthy();
  });
});
