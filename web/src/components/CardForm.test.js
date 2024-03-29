import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';
import Router from 'react-router-dom';

import CardForm from './CardForm';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn()
}));

const defaultProps = {
  title: 'test'
};

const setup = (props = {}) => {
  jest
    .spyOn(Router, 'useHistory')
    .mockReturnValue({ goBack: () => mockGoBack() });
  return renderWithConnection(
    <CardForm {...defaultProps} {...props}>
      hello world
    </CardForm>
  );
};

describe('card form wrapper', () => {
  beforeEach(() => {
    mockGoBack.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders without an id on the container if id prop is null', () => {
    setup({ id: null });

    expect(screen.getByText('hello world')).toBeTruthy();
  });

  test('renders with the provided id on the container if id prop is set', () => {
    setup({ id: 'my-custom-id' });

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('#my-custom-id')).toBeTruthy();
    expect(screen.getByText('hello world')).toBeTruthy();
  });

  test('renders with the default id on the container if id prop is not set', () => {
    setup();

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('#start-main-content')).toBeTruthy();
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

  test('renders a footer if provided', () => {
    setup({ footer: <div>hello footer</div> });

    expect(screen.getByText('hello footer')).toBeTruthy();
  });

  test('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    setup({ onSave: jest.fn(), working: true });

    expect(screen.getByRole('button', { name: /Working/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Working/ })).toBeDisabled();
  });

  test('calls the onSave prop when the form is submitted', () => {
    const onSave = jest.fn();
    setup({ onSave });

    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(onSave).toHaveBeenCalled();
  });

  test('calls the onCancel prop when the form is canceled', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
