import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Password from './PasswordWithMeter';

describe('PasswordWithmeter component', () => {
  it('renders with no props', () => {
    expect(shallow(<Password />)).toMatchSnapshot();
  });

  it('renders with various passwords', () => {
    // weak, strength = 0
    expect(shallow(<Password value="a" />)).toMatchSnapshot();

    // weak, strength = 1
    expect(shallow(<Password value="abCD" />)).toMatchSnapshot();

    // weak, strength = 2
    expect(shallow(<Password value="abCD321" />)).toMatchSnapshot();

    // good, strength = 3
    expect(shallow(<Password value="abCD321!," />)).toMatchSnapshot();

    // great, strength = 4
    expect(shallow(<Password value="abCD321!,@_" />)).toMatchSnapshot();
  });

  it('shows the password', () => {
    const component = shallow(<Password value="abcd1234" />);
    component.find('Choice').simulate('change');

    expect(component).toMatchSnapshot();
  });

  it('calls out on change', () => {
    const onChange = sinon.spy();
    const event = { target: { value: 'change event' } };

    const component = shallow(<Password value="" onChange={onChange} />);
    component.find('TextField').simulate('change', event);

    expect(onChange.calledWith(event)).toEqual(true);
  });
});
