import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';
import LoginMFAEnroll from './LoginMFAEnroll';

let props;
let renderUtils;

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
    renderUtils = renderWithConnection(<LoginMFAEnroll {...props} />);
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = renderUtils;
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('legend renders', () => {
    const { getByText } = renderUtils;
    expect(
      getByText('Choose a Multi-Factor Authentication route.')
    ).toBeTruthy();
  });

  test('factor checkbox renders', () => {
    const { getByLabelText, getByRole } = renderUtils;
    expect(getByLabelText('Call')).toBeTruthy();

    expect(getByRole('radio')).not.toHaveAttribute('checked');
    fireEvent.click(getByLabelText('Call'));
  });

  test('user selects a mfa option', () => {
    const { getByLabelText, getByRole } = renderUtils;
    fireEvent.click(getByLabelText('Call'));

    fireEvent.click(getByRole('button', { name: 'Submit' }));
    expect(props.handleSelection).toHaveBeenCalled();
  });
});
