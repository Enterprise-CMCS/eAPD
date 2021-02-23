import React from 'react';
import { renderWithConnection, axe } from 'apd-testing-library';
import LoginLocked from './LoginLocked';

let props;
let renderUtils;

describe('<LoginLocked />', () => {
  beforeEach(() => {
    props = {
      onCancel: jest.fn()
    };
    renderUtils = renderWithConnection(<LoginLocked {...props} />);
  });

  it('should not fail any accessibility tests', async () => {
    const { container } = renderUtils;
    expect(await axe(container)).toHaveNoViolations();
  });

  test('title renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Verify Your Identity/)).toBeTruthy();
  });

  test('locked message renders', () => {
    const { getByText } = renderUtils;
    expect(getByText(/Account Locked/)).toBeTruthy();
  });

  test('contact message renders', () => {
    const { getByText } = renderUtils;
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
    const { getByRole } = renderUtils;
    expect(getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });
});
