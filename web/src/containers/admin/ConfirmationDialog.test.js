import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationDialog from './ConfirmationDialog';

let props;

describe('<ConfirmationDialog />', () => {
  test('renders dialog box title', async () => {
    props = {
      isDenied: true
    };

    const component = shallow(<ConfirmationDialog {...props} />);
    expect(component.find('Deny')).toBeTruthy();
  });

  test('renders dialog box title with revoked', async () => {
    props = {
      isDenied: false
    };

    const component = shallow(<ConfirmationDialog {...props} />);
    expect(component.find('Revoke')).toBeTruthy();
  });

  test('renders confirm and cancel buttons', () => {
    const component = shallow(<ConfirmationDialog />);
    expect(component.find('Confirm')).toBeTruthy();
    expect(component.find('Cancel')).toBeTruthy();
  });
});
