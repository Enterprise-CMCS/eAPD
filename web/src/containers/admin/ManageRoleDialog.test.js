import React from 'react';
import { shallow } from 'enzyme';
import ManageRoleDialog from './ManageRoleDialog';

let props;

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
  test('shows dialog box title', () => {
    props = {
      roleTypes: ['State Admin', 'State Contractor'],
      selectedAffiliation,
      hideManageModal: jest.fn(),
      handleAffiliationUpdate: jest.fn()
    };
    const component = shallow(<ManageRoleDialog {...props} />);
    expect(component.find('Edit Permissions')).toBeTruthy();
  });

  // Todo: add more tests here
});
