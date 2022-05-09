import React from 'react';
import {
  renderWithConnection,
  fireEvent,
  axe,
  screen
} from 'apd-testing-library';
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
    setup();
    expect(screen.getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('legend renders', () => {
    setup();
    expect(
      screen.getByText('Choose a Multi-Factor Authentication route.')
    ).toBeTruthy();
  });

  test('factor checkbox renders', () => {
    setup();
    expect(screen.getByLabelText('Call')).toBeTruthy();

    expect(screen.getByRole('radio')).not.toHaveAttribute('checked');
    fireEvent.click(screen.getByLabelText('Call'));
  });

  test('user selects a mfa option', () => {
    setup();
    fireEvent.click(screen.getByLabelText('Call'));

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(defaultProps.handleSelection).toHaveBeenCalled();
  });
});
