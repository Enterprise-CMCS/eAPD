import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { Input, Textarea, DollarInput, PercentInput, RichText } from './Inputs';

describe('Input component', () => {
  test('renders correctly', () => {
    const component = mount(<Input name="name" label="label" />);
    expect(component).toMatchSnapshot();
  });
});

describe('Textarea component', () => {
  test('renders correctly', () => {
    const component = mount(<Textarea name="name" label="label" />);
    expect(component).toMatchSnapshot();
  });
});

describe('DollarInput component', () => {
  test('renders correctly', () => {
    const component = shallow(<DollarInput name="name" label="label" />);
    expect(component).toMatchSnapshot();
  });

  test('sends unmasked data in onChange event', () => {
    const onChange = sinon.spy();
    const component = mount(
      <DollarInput name="name" label="label" onChange={onChange} />
    );
    component
      .find('input')
      .simulate('change', { target: { value: '$12,523.32' } });

    expect(
      onChange.calledWith({ target: { value: 12523.32, masked: '$12,523.32' } })
    );
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
    component.find('input').simulate('change', { target: { value: '12.32%' } });

    expect(onChange.calledWith({ target: { value: 12.32, masked: '12.32%' } }));
  });
});

describe('RichText component', () => {
  // Can't test rendering against a snapshot because the react-draft-wysiwyg
  // component internally creates random IDs/keys, so it's nondeterministic.
  test('survives blurring if no onSync method is provided', () => {
    const component = shallow(<RichText />);
    component.simulate('blur');
  });

  test('synchronizes on blur', () => {
    const onSync = sinon.spy();
    const component = shallow(<RichText onSync={onSync} />);
    component.simulate('blur');
    expect(onSync.calledOnce).toBeTruthy();
  });

  // All the other tests are pretty tough because they rely on knowing
  // something about the internal behavior of react-draft-wysiwyg
});
