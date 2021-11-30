import React from 'react';
import { renderWithConnection, screen, axe } from 'apd-testing-library';
import LoginLocked from './LoginLocked';

const defaultProps = {
  onCancel: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginLocked {...defaultProps} {...props} />);

describe('<LoginLocked />', () => {
  // TODO:
  xit('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    setup();
    expect(screen.getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('locked message renders', () => {
    setup();
    expect(screen.getByText(/Account Locked/)).toBeTruthy();
  });

  test('contact message renders', () => {
    setup();
    expect(
      screen.getByText(/Your account will reset automatically in one hour/i)
    ).toBeTruthy();
  });

  test('cancel button renders', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
