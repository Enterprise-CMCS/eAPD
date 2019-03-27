import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import AdminForm from './AdminForm';

describe('admin page > form wrapper', () => {
  test('renders without a save button if onSave prop is missing', () => {
    expect(
      shallow(<AdminForm title="test">hello world</AdminForm>)
    ).toMatchSnapshot();
  });

  test('renders with a save button if onSave prop is provided', () => {
    expect(
      shallow(
        <AdminForm title="test" onSave={sinon.spy()}>
          hello world
        </AdminForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a legend if provided', () => {
    expect(
      shallow(
        <AdminForm title="test" legend="of zelda">
          hello world
        </AdminForm>
      )
    ).toMatchSnapshot();
  });

  test('renders an error alert if message provided', () => {
    expect(
      shallow(
        <AdminForm title="test" error="oh noes!">
          hello world
        </AdminForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a success alert if message provided', () => {
    expect(
      shallow(
        <AdminForm title="test" success="oh yeah!">
          hello world
        </AdminForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
    expect(
      shallow(
        <AdminForm title="test" onSave={sinon.spy()} working>
          hello world
        </AdminForm>
      )
    ).toMatchSnapshot();
  });

  test('calls the onSave prop when the form is submitted', () => {
    const onSave = sinon.spy();
    const component = shallow(
      <AdminForm title="test" onSave={onSave}>
        hello world
      </AdminForm>
    );

    component.find('form').simulate('submit');

    expect(onSave.calledOnce).toEqual(true);
  });

  test('calls the onCancel prop when the form is canceled', () => {
    const onCancel = sinon.spy();
    const component = shallow(
      <AdminForm title="test" onCancel={onCancel}>
        hello world
      </AdminForm>
    );

    component
      .find('Button')
      .findWhere(b => b.prop('variation') === 'transparent')
      .simulate('click');

    expect(onCancel.calledOnce).toEqual(true);
  });
});
