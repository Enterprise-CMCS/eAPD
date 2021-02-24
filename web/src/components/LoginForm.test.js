import React from 'react';
import sinon from 'sinon';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';

import LoginForm from './LoginForm';

describe('card form wrapper', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = renderWithConnection(
      <LoginForm title="test">hello world</LoginForm>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders without an id on the container if id prop is null', () => {
    const { container } = renderWithConnection(
      <LoginForm id={null} title="test">
        hello world
      </LoginForm>
    );
    expect(container.querySelector('.card--container')).not.toHaveAttribute(
      'id'
    );
  });

  it('renders with the provided id on the container if id prop is set', () => {
    const { container } = renderWithConnection(
      <LoginForm id="my custom id" title="test">
        hello world
      </LoginForm>
    );
    expect(container.querySelector('.card--container')).toHaveAttribute(
      'id',
      'my custom id'
    );
  });

  it('renders without a save button if onSave prop is missing', () => {
    const { queryByRole } = renderWithConnection(
      <LoginForm title="test">hello world</LoginForm>
    );

    expect(queryByRole('button', { name: /save/i })).toBeNull();
  });

  it('renders with a save button if onSave prop is provided', () => {
    const { queryByRole } = renderWithConnection(
      <LoginForm title="test" onSave={sinon.spy()}>
        hello world
      </LoginForm>
    );

    expect(queryByRole('button', { name: /save/i })).toBeTruthy();
  });

  it('disables the save button if canSubmit is false', () => {
    const { queryByRole } = renderWithConnection(
      <LoginForm title="test" onSave={sinon.spy()} canSubmit={false}>
        hello world
      </LoginForm>
    );
    expect(queryByRole('button', { name: /save/i })).toBeDisabled();
  });

  it('renders a legend if provided', () => {
    const { queryByText } = renderWithConnection(
      <LoginForm title="test" legend="of zelda">
        hello world
      </LoginForm>
    );
    expect(queryByText('of zelda')).toBeTruthy();
  });

  it('renders an error alert if message provided', () => {
    const { queryByText } = renderWithConnection(
      <LoginForm title="test" error="oh noes!">
        hello world
      </LoginForm>
    );
    expect(queryByText('oh noes!')).toBeTruthy();
  });

  it('renders a success alert if message provided', () => {
    const { queryByText } = renderWithConnection(
      <LoginForm title="test" success="oh yeah!">
        hello world
      </LoginForm>
    );
    expect(queryByText('oh yeah!')).toBeTruthy();
  });

  it('does not render a cancel button if form is not cancelable', () => {
    const { queryByRole } = renderWithConnection(
      <LoginForm title="test" cancelable={false}>
        hello world
      </LoginForm>
    );
    expect(queryByRole('button', { name: /cancel/i })).toBeNull();
  });

  xit('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    const { container, queryByRole } = renderWithConnection(
      <LoginForm title="test" onSave={sinon.spy()} working>
        hello world
      </LoginForm>
    );
    expect(queryByRole('button', { name: /working/i })).toBeTruthy();
    expect(queryByRole('button', { name: /working/i })).toBeDisabled();
    expect(container.querySelector('.ds-c-spinner')).toBeTruthy();
  });

  it('calls the onSave prop when the form is submitted', () => {
    const onSave = jest.fn();
    const { queryByRole } = renderWithConnection(
      <LoginForm title="test" onSave={onSave}>
        hello world
      </LoginForm>
    );
    fireEvent.click(queryByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalled();
  });

  it('calls the onCancel prop when the form is canceled', () => {
    const { queryByRole, history } = renderWithConnection(
      <LoginForm title="test">hello world</LoginForm>,
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
