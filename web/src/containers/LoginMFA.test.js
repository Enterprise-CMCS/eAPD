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
      action: jest.fn()
    };
    renderUtils = renderWithConnection(<LoginMFA {...props} />);
  });

  test('user enters otp', () => {
    const { getByLabelText, getByRole } = renderUtils;
    expect(getByLabelText('Verification Code')).toBeTruthy();
    expect(getByRole('button', { name: 'Verify' }));
    fireEvent.change(getByLabelText('Verification Code'), {
      target: { value: 'testotp' }
    });
    fireEvent.click(getByRole('button', { name: 'Verify' }));
    expect(props.action).toHaveBeenCalledWith('testotp');
  });
});
