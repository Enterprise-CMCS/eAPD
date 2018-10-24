import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { DollarInput, PercentInput } from '.';

const event = value => ({
  target: {
    focus: sinon.spy(),
    value
  },
  persist: sinon.spy()
});

describe('DollarInput component', () => {
  test('renders correctly', () => {
    const component = shallow(<DollarInput name="name" label="label" />);
    expect(component).toMatchSnapshot();
  });

  test('sends masked and unmasked data in onChange event', () => {
    const onChange = sinon.spy();
    const component = mount(
      <DollarInput name="name" label="label" onChange={onChange} />
    );
    component.find('input').simulate('change', event('12523.32'));

    expect(
      onChange.calledWith({ target: { value: 12523, masked: '$12523' } })
    ).toEqual(true);
  });
});

describe('PercentInput component', () => {
  test('renders correctly', () => {
    const component = shallow(<PercentInput name="name" label="label" />);
    expect(component).toMatchSnapshot();
  });

  test('sends unmasked data in onChange event', () => {
    const onChange = sinon.spy();
    const component = mount(
      <PercentInput name="name" label="label" onChange={onChange} />
    );
    component.find('input').simulate('change', event('12'));

    expect(
      onChange.calledWith({ target: { value: 12, masked: '12%' } })
    ).toEqual(true);
  });
});
