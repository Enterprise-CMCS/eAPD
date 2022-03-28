import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  screen
} from 'apd-testing-library';
import LoginMFAEnrollPhoneNumber from './LoginMFAEnrollPhoneNumber';

const defaultProps = {
  handlePhoneSubmit: jest.fn()
};

const setup = (props = {}) =>
  renderWithConnection(
    <LoginMFAEnrollPhoneNumber {...defaultProps} {...props} />
  );

describe('<LoginMFAEnrollPhoneNumber />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    setup();
    expect(screen.getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('phone field renders', () => {
    setup();
    expect(screen.getByTestId('mfaPhoneNumber')).toBeTruthy();
  });

  test('user enters phone number', () => {
    setup();
    fireEvent.change(screen.getByTestId('mfaPhoneNumber'), {
      target: { value: '4105555555' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(defaultProps.handlePhoneSubmit).toHaveBeenCalledWith('4105555555');
  });
});
