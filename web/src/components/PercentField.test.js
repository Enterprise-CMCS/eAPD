import { mount } from 'enzyme';
import React from 'react';

import PercentField from './PercentField';

describe('PercentField component', () => {
  it('renders correctly', () => {
    const component = mount(
      <PercentField
        label="test label"
        name="test name"
        size="medium"
        className="stuff"
        value="123"
        onChange={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
