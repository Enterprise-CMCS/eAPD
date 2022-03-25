import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';
import LoginMFAEnroll from './LoginMFAEnroll';

const defaultProps = {
  selectedOption: '',
  handleSelection: jest.fn(),
  factors: [
    {
      factorType: 'call',
      provider: 'OKTA',
      vendorName: 'OKTA',
      status: 'NOT_SETUP',
      enrollment: 'OPTIONAL',
      displayName: 'Call',
      active: true
    }
  ]
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginMFAEnroll {...defaultProps} {...props} />);

describe('<LoginMFAEnroll />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    const { getByText } = setup();
    expect(getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('legend renders', () => {
    const { getByText } = setup();
    expect(
      getByText('Choose a Multi-Factor Authentication route.')
    ).toBeTruthy();
  });

  test('factor checkbox renders', () => {
    const { getByLabelText, getByRole } = setup();
    expect(getByLabelText('Call')).toBeTruthy();

    expect(getByRole('radio')).not.toHaveAttribute('checked');
    fireEvent.click(getByLabelText('Call'));
  });

  test('user selects a mfa option', () => {
    const { getByLabelText, getByRole } = setup();
    fireEvent.click(getByLabelText('Call'));

    fireEvent.click(getByRole('button', { name: 'Submit' }));
    expect(defaultProps.handleSelection).toHaveBeenCalled();
  });
});
