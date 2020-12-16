import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationDialog from './ConfirmationDialog';

let props;

describe('<ConfirmationDialog />', () => {
  test('shows dialog box title', async () => {
    props = {
      isDenied: true
    };

    const component = shallow(<ConfirmationDialog {...props} />);
    expect(component.find('Deny')).toBeTruthy();
  });

  // Todo: add more tests here
  // 1. test that cancel triggers the hideConfirmationModal fn
  // 2. test that confirm triggers handleDenyOrRevoke fn
  // 3. test p is rendered with correct denyOrRevoke (use revoke)
});
