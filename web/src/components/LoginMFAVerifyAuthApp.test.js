import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import LoginMFAVerifyAuthApp from './LoginMFAVerifyAuthApp';

let props;
let renderUtils;

describe('<LoginMFAVerifyAuthApp />', () => {
  beforeEach(() => {
    props = {
      handleVerificationCode: jest.fn(),
      verificationData: {
        qrcode: { href: 'http://placeholder.com/image.png' },
        sharedSecret: 'A1234'
      }
    };
    renderUtils = renderWithConnection(<LoginMFAVerifyAuthApp {...props} />);
  });

  test('title renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Configure Multi-Factor Authentication/)).toBeTruthy();
  });

  test('qr code renders', () => {
    const { getByAltText } = renderUtils;
    expect(getByAltText('QR Code')).toBeTruthy();
  });

  test('secret renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/A1234/)).toBeTruthy();
  });

  test('user enters otp', () => {
    const { getByRole, getByTestId } = renderUtils;
    expect(getByRole('button', { name: 'Submit' }));
    fireEvent.change(getByTestId('input-otp-code'), {
      target: { value: 'testotp' }
    });
    fireEvent.click(getByRole('button', { name: 'Submit' }));
    expect(props.handleVerificationCode).toHaveBeenCalledWith('testotp');
  });
});
