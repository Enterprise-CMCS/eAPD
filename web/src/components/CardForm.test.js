import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as CardForm } from './CardForm';

const history = { goBack: sinon.spy() };

describe('card form wrapper', () => {
  beforeEach(() => {
    history.goBack.resetHistory();
  });

  test('renders without a save button if onSave prop is missing', () => {
    expect(
      shallow(
        <CardForm title="test" history={history}>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with a save button if onSave prop is provided', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} onSave={sinon.spy()}>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('disables the save button if canSubmit is false', () => {
    expect(
      shallow(
        <CardForm
          title="test"
          history={history}
          onSave={sinon.spy()}
          canSubmit={false}
        >
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a legend if provided', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} legend="of zelda">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders an error alert if message provided', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} error="oh noes!">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a success alert if message provided', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} success="oh yeah!">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('does not render a cancel button if form is not cancelable', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} cancelable={false}>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a footer if provided', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} footer={<div>Hello</div>}>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    expect(
      shallow(
        <CardForm title="test" history={history} onSave={sinon.spy()} working>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('calls the onSave prop when the form is submitted', () => {
    const onSave = sinon.spy();
    const component = shallow(
      <CardForm title="test" history={history} onSave={onSave}>
        hello world
      </CardForm>
    );

    component.find('form').simulate('submit');

    expect(onSave.calledOnce).toEqual(true);
  });

  test('calls the onCancel prop when the form is canceled', () => {
    const component = shallow(
      <CardForm title="test" history={history}>
        hello world
      </CardForm>
    );

    component
      .find('Button')
      .findWhere(b => b.prop('variation') === 'transparent')
      .simulate('click');

    expect(history.goBack.calledOnce).toEqual(true);
  });
});
