import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  screen
} from 'apd-testing-library';
import LoginMFAVerifyAuthApp from './LoginMFAVerifyAuthApp';

const defaultProps = {
  handleVerificationCode: jest.fn(),
  verificationData: {
    qrcode: { href: 'http://placeholder.com/image.png' },
    sharedSecret: 'A1234'
  }
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginMFAVerifyAuthApp {...defaultProps} {...props} />);

describe('<LoginMFAVerifyAuthApp />', () => {
  // TODO:
  xit('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    setup();
    expect(
      screen.getByText(/Configure Multi-Factor Authentication/)
    ).toBeTruthy();
  });

  test('qr code renders', () => {
    setup();
    expect(screen.getByAltText('QR Code')).toBeTruthy();
  });

  test('secret renders', () => {
    setup();
    expect(screen.getByText(/A1234/)).toBeTruthy();
  });

  test('user enters otp', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Submit' }));
    fireEvent.change(screen.getByTestId('input-otp-code'), {
      target: { value: 'testotp' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(defaultProps.handleVerificationCode).toHaveBeenCalledWith('testotp');
  });
});
