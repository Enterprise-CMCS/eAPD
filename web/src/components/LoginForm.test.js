import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';

import LoginForm from './LoginForm';

const defaultProps = {
  title: 'test'
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}, options = {}) =>
  renderWithConnection(
    <LoginForm {...defaultProps} {...props}>
      hello world
    </LoginForm>,
    options
  );

describe('card form wrapper', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders without an id on the container if id prop is null', () => {
    const { container } = setup({ id: null });
    expect(container.querySelector('.card--container')).not.toHaveAttribute(
      'id'
    );
  });

  it('renders with the provided id on the container if id prop is set', () => {
    const { container } = setup({ id: 'my custom id' });
    expect(container.querySelector('.card--container')).toHaveAttribute(
      'id',
      'my custom id'
    );
  });

  it('renders without a save button if onSave prop is missing', () => {
    const { queryByRole } = setup();

    expect(queryByRole('button', { name: /save/i })).toBeNull();
  });

  it('renders with a save button if onSave prop is provided', () => {
    const onSave = jest.fn().mockImplementation(e => e.preventDefault());
    const { queryByRole } = setup({ onSave });

    expect(queryByRole('button', { name: /save/i })).toBeTruthy();
  });

  it('disables the save button if canSubmit is false', () => {
    const onSave = jest.fn().mockImplementation(e => e.preventDefault());
    const { queryByRole } = setup({ onSave, canSubmit: false });
    expect(queryByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('renders a legend if provided', () => {
    const { queryByText } = setup({ legend: 'of zelda' });
    expect(queryByText('of zelda')).toBeTruthy();
  });

  it('renders an error alert if message provided', () => {
    const { queryByText } = setup({ error: 'oh noes!' });
    expect(queryByText('oh noes!')).toBeTruthy();
  });

  it('renders a success alert if message provided', () => {
    const { queryByText } = setup({ success: 'oh yeah!' });
    expect(queryByText('oh yeah!')).toBeTruthy();
  });

  it('does not render a cancel button if form is not cancelable', () => {
    const { queryByRole } = setup({ cancelable: false });
    expect(queryByRole('button', { name: /cancel/i })).toBeNull();
  });

  it('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    const onSave = jest.fn().mockImplementation(e => e.preventDefault());
    const { container, queryByRole } = setup({ onSave, working: true });

    expect(queryByRole('button', { name: /working/i })).toBeTruthy();
    expect(queryByRole('button', { name: /working/i })).toBeDisabled();
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('calls the onSave prop when the form is submitted', () => {
    const onSave = jest.fn().mockImplementation(e => e.preventDefault());
    const { queryByRole } = setup({ onSave });
    fireEvent.click(queryByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalled();
  });

  it('calls the onCancel prop when the form is canceled', () => {
    const { queryByRole, history } = setup(
      {},
      {
        initialHistory: ['/']
      }
    );
    history.push('/login');
    expect(history.index).toEqual(1);
    fireEvent.click(queryByRole('button', { name: /cancel/i }));
    expect(history.index).toEqual(0);
  });
});
