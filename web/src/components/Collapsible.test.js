import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Collapsible from './Collapsible';

describe('Collapsible component', () => {
  test('renders correctly in the default case', () => {
    const component = shallow(<Collapsible title="default render case" />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly when open', () => {
    const component = shallow(<Collapsible title="open render case" open />);
    expect(component).toMatchSnapshot();
  });

  test('sets sticky class if enabled', () => {
    const component = shallow(<Collapsible title="open render case" sticky />);
    expect(component).toMatchSnapshot();
  });

  test('toggles from closed to open', () => {
    const component = shallow(<Collapsible title="toggle to open case" />);
    component.find('button').simulate('click');

    expect(component).toMatchSnapshot();
    expect(component.state().open).toBeTruthy();
  });

  test('toggles from open to closed', () => {
    const component = shallow(
      <Collapsible title="toggle to closed case" open />
    );
    component.find('button').simulate('click');

    expect(component).toMatchSnapshot();
    expect(component.state().open).toBeFalsy();
  });

  test('calls back on toggle', () => {
    const onChange = sinon.stub();
    const component = shallow(
      <Collapsible title="callback case" onChange={onChange} />
    );
    component.find('button').simulate('click');

    expect(onChange.calledOnce).toBeTruthy();
  });
});
