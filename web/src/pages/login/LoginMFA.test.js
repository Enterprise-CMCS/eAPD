import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  screen
} from 'apd-testing-library';
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
    jest.setTimeout(300000);
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('user enters otp', () => {
    setup();
    expect(
      screen.getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      )
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Verify Identity' }));
    fireEvent.change(
      screen.getByLabelText(
        'Enter the verification code provided to you via call, text, email, or your chosen authenticator app.'
      ),
      {
        target: { value: 'testotp' }
      }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Verify Identity' }));
    expect(defaultProps.saveAction).toHaveBeenCalledWith('testotp');
  });

  test('Back to Login button renders', () => {
    setup();
    expect(screen.getByText(/Back to Login/i)).toBeTruthy();
  });
});
