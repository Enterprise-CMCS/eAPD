import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationDialog from './ConfirmationDialog';

const props = {
  hideConfirmationModal: jest.fn(),
  handleDenyOrRevoke: jest.fn(),
  isDenied: false
};

describe('<ConfirmationDialog />', () => {
  test('renders dialog box title', async () => {
    const component = shallow(<ConfirmationDialog {...props} isDenied />);
    expect(component.find('Deny')).toBeTruthy();
  });

  test('renders dialog box title with revoked', async () => {
    const component = shallow(<ConfirmationDialog {...props} />);
    expect(component.find('Revoke')).toBeTruthy();
  });

  test('renders confirm and cancel buttons', () => {
    const component = shallow(<ConfirmationDialog {...props} />);
    expect(component.find('Confirm')).toBeTruthy();
    expect(component.find('Cancel')).toBeTruthy();
  });
});
