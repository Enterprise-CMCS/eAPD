import React from 'react';
import { renderWithConnection } from 'apd-testing-library';
import LoginLocked from './LoginLocked';

let props;
let renderUtils;

describe('<LoginLocked />', () => {
  beforeEach(() => {
    props = {};
    renderUtils = renderWithConnection(<LoginLocked {...props} />);
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
    expect(getByText(/Contact the System Administrator for account reset./)).toBeTruthy();
  });

  test('cancel button renders', () => {
    const { getByRole } = renderUtils;
    expect(getByRole('link', { name: 'Cancel' })).toBeTruthy();
  });
});