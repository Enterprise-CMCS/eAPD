import React from 'react';
import { renderWithConnection, fireEvent, screen } from 'apd-testing-library';
import LoginMFAEnroll from './LoginMFAEnroll';

let props;

describe('<LoginMFAEnroll />', () => {
  beforeEach(() => {
    props = {
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
    renderWithConnection(<LoginMFAEnroll {...props} />);
  });

  test('title renders', () => {
    expect(screen.getByText(/Verify Your Identity/)).toBeInTheDocument();
  });

  test('legend renders', () => {
    expect(
      screen.getByText('Choose a Multi-Factor Authentication route.')
    ).toBeInTheDocument();
  });

  test('factor checkbox renders', () => {
    expect(screen.getByLabelText('Call')).toBeInTheDocument();

    expect(screen.getByRole('radio')).not.toBeChecked();
    fireEvent.click(screen.getByLabelText('Call'));
  });

  test('user selects a mfa option', () => {
    fireEvent.click(screen.getByLabelText('Call'));

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(props.handleSelection).toHaveBeenCalled();
  });
});
