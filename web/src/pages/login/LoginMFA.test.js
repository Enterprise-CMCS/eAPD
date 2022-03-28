import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';
import LoginMFA from './LoginMFA';

const defaultProps = {
  errorMessage: null,
  hasEverLoggedOn: true,
  fetching: false,
  mfaType: 'email',
  saveAction: jest.fn(),
  cancelAction: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginMFA {...defaultProps} {...props} />);

describe('<LoginMFA />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('user enters otp', () => {
    const { getByLabelText, getByRole } = setup();
    expect(
      getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      )
    ).toBeTruthy();
    expect(getByRole('button', { name: 'Verify Identity' }));
    fireEvent.change(
      getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      ),
      {
        target: { value: 'testotp' }
      }
    );
    fireEvent.click(getByRole('button', { name: 'Verify Identity' }));
    expect(defaultProps.saveAction).toHaveBeenCalledWith('testotp');
  });

  test('Back to Login button renders', () => {
    const { getByText } = setup();
    expect(getByText(/Back to Login/i)).toBeTruthy();
  });
});
