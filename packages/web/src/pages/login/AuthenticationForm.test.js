import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

import AuthenticationForm from './AuthenticationForm';

const defaultProps = {
  title: 'test'
};

const setup = (props = {}) => {
  return renderWithConnection(
    <AuthenticationForm {...defaultProps} {...props}>
      hello world
    </AuthenticationForm>
  );
};

describe('card form wrapper', () => {
  test('renders without an id on the container if id prop is null', () => {
    setup({ id: null });

    expect(screen.getByText('hello world')).toBeTruthy();
  });

  test('renders with the provided id on the container if id prop is set', () => {
    setup({ id: 'my-custom-id' });

    expect(document.querySelector('#my-custom-id')).toBeTruthy();
    expect(screen.getByText('hello world')).toBeTruthy();
  });

  test('renders without a save button if onSave prop is missing', () => {
    setup();

    expect(screen.queryByRole('button', { name: 'Save changes' })).toBeNull();
  });

  test('renders with a save button if onSave prop is provided', () => {
    setup({ onSave: jest.fn() });

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeTruthy();
  });

  test('disables the save button if canSubmit is false', () => {
    setup({ onSave: jest.fn(), canSubmit: false });

    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
  });

  test('renders a legend if provided', () => {
    setup({ legend: 'hidden temple' });

    expect(screen.getByText('hidden temple')).toBeTruthy();
  });

  test('renders an error alert if message provided', () => {
    setup({ error: 'oh noes!' });

    expect(screen.getByText('oh noes!')).toBeTruthy();
  });

  test('renders a success alert if message provided', () => {
    setup({ success: 'oh yeah!' });

    expect(screen.getByText('oh yeah!')).toBeTruthy();
  });

  test('does not render a cancel button if form is not cancelable', () => {
    setup({ cancelable: false });

    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
  });
});
