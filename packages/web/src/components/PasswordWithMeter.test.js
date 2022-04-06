import { shallow } from 'enzyme';
import React from 'react';

// Import the lazy-loading zxcvbn so we can use jest's mocking functionality
// eslint-disable-next-line no-unused-vars
import zxcvbn from '../lazy/zxcvbn';

import Password from './PasswordWithMeter';

jest.mock('../lazy/zxcvbn');

describe('PasswordWithmeter component', () => {
  it('renders with no props', () => {
    expect(shallow(<Password />)).toMatchSnapshot();
  });

  it('renders with various passwords', () => {
    // weak, strength = 0
    expect(shallow(<Password value="a" showMeter />)).toMatchSnapshot();

    // weak, strength = 1
    expect(shallow(<Password value="abCD" showMeter />)).toMatchSnapshot();

    // weak, strength = 2
    expect(shallow(<Password value="abCD321" showMeter />)).toMatchSnapshot();

    // good, strength = 3
    expect(shallow(<Password value="abCD321!," showMeter />)).toMatchSnapshot();

    // great, strength = 4
    expect(
      shallow(<Password value="abCD321!,@_" showMeter />)
    ).toMatchSnapshot();
  });

  it('shows the password', () => {
    const component = shallow(<Password value="abcd1234" />);
    component.find('ChoiceComponent').simulate('change');

    expect(component).toMatchSnapshot();
  });

  it('calls out on change', () => {
    const onChange = jest.fn();
    const event = { target: { value: 'change event' } };

    const component = shallow(<Password value="" onChange={onChange} />);
    component.find('TextField').simulate('change', event);

    expect(onChange).toHaveBeenLastCalledWith(event);
  });

  it('shows the strength meter when parameter is true', () => {
    const component = shallow(<Password value="test" showMeter />);
    expect(component.exists('.strength-meter')).toEqual(true);
  });

  it('does not show the strength meter when paramter is false', () => {
    const component = shallow(<Password value="" />);
    expect(component.exists('.strength-meter')).toEqual(false);
  });
});
