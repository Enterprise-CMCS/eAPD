import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as AuthenticationForm } from './AuthenticationForm';

const history = { goBack: sinon.spy() };

const defaultProps = {
  title: 'test',
  history,
  children: ''
};

const setup = (props = {}) => {
  return mount(<AuthenticationForm {...defaultProps} {...props} />);
};

describe('card form wrapper', () => {
  beforeEach(() => {
    history.goBack.resetHistory();
  });

  test('renders without an id on the container if id prop is null', () => {
    expect(
      shallow(
        <AuthenticationForm id={null} title="test" history={history}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with the provided id on the container if id prop is set', () => {
    expect(
      shallow(
        <AuthenticationForm id="my custom id" title="test" history={history}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with the default id on the container if id prop is not set', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders without a save button if onSave prop is missing', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with a save button if onSave prop is provided', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history} onSave={sinon.spy()}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('disables the save button if canSubmit is false', () => {
    expect(
      shallow(
        <AuthenticationForm
          title="test"
          history={history}
          onSave={sinon.spy()}
          canSubmit={false}
        >
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a legend if provided', () => {
    const props = {
      legend: 'hidden temple'
    };

    const component = setup(props);

    expect(component.find('legend').exists()).toBe(true);
  });

  test('renders an error alert if message provided', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history} error="oh noes!">
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a success alert if message provided', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history} success="oh yeah!">
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });

  test('does not render a cancel button if form is not cancelable', () => {
    expect(
      shallow(
        <AuthenticationForm title="test" history={history} cancelable={false}>
          hello world
        </AuthenticationForm>
      )
    ).toMatchSnapshot();
  });
});
