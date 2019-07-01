import { shallow } from 'enzyme';
import React from 'react';

import Select from './Select';

describe('Select component', () => {
  test('renders with a label', () => {
    const component = shallow(
      <Select
        name="select name"
        options={['1', '2', '3']}
        label="select label"
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders without a label', () => {
    const component = shallow(
      <Select
        name="select name"
        options={['1', '2', '3']}
        label="select label"
        hideLabel
      />
    );
    expect(component).toMatchSnapshot();
  });
});
