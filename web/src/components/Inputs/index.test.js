import { mount } from 'enzyme';
import React from 'react';

import { Input, Textarea } from '.';

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
