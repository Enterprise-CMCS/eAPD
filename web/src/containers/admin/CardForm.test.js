import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import CardForm from '../../components/CardForm';

describe('card form wrapper', () => {
  test('renders without a save button if onSave prop is missing', () => {
    expect(
      shallow(<CardForm title="test">hello world</CardForm>)
    ).toMatchSnapshot();
  });

  test('renders with a save button if onSave prop is provided', () => {
    expect(
      shallow(
        <CardForm title="test" onSave={sinon.spy()}>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a legend if provided', () => {
    expect(
      shallow(
        <CardForm title="test" legend="of zelda">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders an error alert if message provided', () => {
    expect(
      shallow(
        <CardForm title="test" error="oh noes!">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a success alert if message provided', () => {
    expect(
      shallow(
        <CardForm title="test" success="oh yeah!">
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    expect(
      shallow(
        <CardForm title="test" onSave={sinon.spy()} working>
          hello world
        </CardForm>
      )
    ).toMatchSnapshot();
  });

  test('calls the onSave prop when the form is submitted', () => {
    const onSave = sinon.spy();
    const component = shallow(
      <CardForm title="test" onSave={onSave}>
        hello world
      </CardForm>
    );

    component.find('form').simulate('submit');

    expect(onSave.calledOnce).toEqual(true);
  });

  test('calls the onCancel prop when the form is canceled', () => {
    const onCancel = sinon.spy();
    const component = shallow(
      <CardForm title="test" onCancel={onCancel}>
        hello world
      </CardForm>
    );

    component
      .find('Button')
      .findWhere(b => b.prop('variation') === 'transparent')
      .simulate('click');

    expect(onCancel.calledOnce).toEqual(true);
  });
});
