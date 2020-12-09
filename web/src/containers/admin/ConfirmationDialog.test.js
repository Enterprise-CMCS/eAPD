import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import ConfirmationDialog from './ConfirmationDialog';

let props;
let renderUtils;

describe('<ConfirmationDialog />', () => {

  test('shows dialog box title', () => {
    props = {
      denyOrRevoke: "deny"
    };
    renderUtils = renderWithConnection(<ConfirmationDialog {...props} />);

    const { getByText } = renderUtils;
    expect(getByText('Confirm Deny')).toBeTruthy();
  });
  
  // Todo: add more tests here
  // 1. test that cancel triggers the hideConfirmationModal fn
  // 2. test that confirm triggers handleDenyOrRevoke fn
  // 3. test p is rendered with correct denyOrRevoke (use revoke)
});
