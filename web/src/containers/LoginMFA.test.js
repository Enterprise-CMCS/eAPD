import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import LoginMFA from './LoginMFA';

let props;
let renderUtils;
describe('<LoginMFA />', () => {
  beforeEach(() => {
    props = {
      errorMessage: '',
      fetching: false,
      mfaType: 'email',
      action: jest.fn()
    };
    renderUtils = renderWithConnection(<LoginMFA {...props} />);
  });

  test('user enters otp', () => {
    const { getByLabelText, getByRole } = renderUtils;
    expect(getByLabelText('Please enter the 6 digit code sent to you via email.')).toBeTruthy();
    expect(getByRole('button', { name: 'Verify' }));
    fireEvent.change(getByLabelText('Please enter the 6 digit code sent to you via email.'), {
      target: { value: 'testotp' }
    });
    fireEvent.click(getByRole('button', { name: 'Verify' }));
    expect(props.action).toHaveBeenCalledWith('testotp');
  });
  
  test('cancel button renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Cancel/i)).toBeTruthy();
  })
});
