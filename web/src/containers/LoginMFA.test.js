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
    expect(
      getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      )
    ).toBeTruthy();
    expect(getByRole('button', { name: 'Verify' }));
    fireEvent.change(
      getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      ),
      {
        target: { value: 'testotp' }
      }
    );
    fireEvent.click(getByRole('button', { name: 'Verify' }));
    expect(props.action).toHaveBeenCalledWith('testotp');
  });

  test('cancel button renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Cancel/i)).toBeTruthy();
  });
});
