import React from 'react';
import { renderWithConnection, axe, screen } from 'apd-testing-library';
import LoginGroupError from './LoginGroupError';

const defaultProps = {
  onCancel: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginGroupError {...defaultProps} {...props} />);

describe('<LoginGroupError />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    setup();
    expect(screen.getByText(/Job Code Missing/)).toBeTruthy();
  });

  test('contact message renders', () => {
    setup();
    expect(
      screen.getByText(
        /You don’t have the correct job code to access the eAPD system./
      )
    ).toBeTruthy();
  });

  test('cancel button renders', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
