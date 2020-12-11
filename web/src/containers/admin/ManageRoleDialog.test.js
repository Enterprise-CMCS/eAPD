import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import ManageRoleDialog from './ManageRoleDialog';

let props;
let renderUtils;

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
      selectedAffiliation,
      roleTypes: ['State Admin', 'State Contractor']
    };
    renderUtils = renderWithConnection(<ManageRoleDialog {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Edit Permissions')).toBeTruthy();
  });

  // Todo: add more tests here
});
