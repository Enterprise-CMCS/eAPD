import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';
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
    const { getByText } = setup();
    expect(getByText(/Configure Multi-Factor Authentication/)).toBeTruthy();
  });

  test('qr code renders', () => {
    const { getByAltText } = setup();
    expect(getByAltText('QR Code')).toBeTruthy();
  });

  test('secret renders', () => {
    const { getByText } = setup();
    expect(getByText(/A1234/)).toBeTruthy();
  });

  test('user enters otp', () => {
    const { getByRole, getByTestId } = setup();
    expect(getByRole('button', { name: 'Submit' }));
    fireEvent.change(getByTestId('input-otp-code'), {
      target: { value: 'testotp' }
    });
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    expect(defaultProps.handleVerificationCode).toHaveBeenCalledWith('testotp');
  });
});
