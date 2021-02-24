import React from 'react';
import { renderWithConnection, axe } from 'apd-testing-library';
import LoginLocked from './LoginLocked';

const defaultProps = {
  onCancel: jest.fn()
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<LoginLocked {...defaultProps} {...props} />);

describe('<LoginLocked />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    const { getByText } = setup();
    expect(getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('locked message renders', () => {
    const { getByText } = setup();
    expect(getByText(/Account Locked/)).toBeTruthy();
  });

  test('contact message renders', () => {
    const { getByText } = setup();
    expect(
      getByText((content, node) => {
        const hasText = () =>
          node.textContent ===
          'Contact CMS-EAPD@cms.hhs.gov for an account reset.';
        const nodeHasText = hasText(node);
        return nodeHasText;
      })
    ).toBeTruthy();
  });

  test('cancel button renders', () => {
    const { getByRole } = setup();
    expect(getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
