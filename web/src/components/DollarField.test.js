import { mount } from 'enzyme';
import React from 'react';

import DollarField from './DollarField';

describe('DollarField component', () => {
  it('renders correctly', () => {
    expect(
      mount(
        <DollarField
          label="test label"
          name="test name"
          size="medium"
          className="stuff"
          value="123"
          onChange={jest.fn()}
        />
      )
    ).toMatchSnapshot();
  });
});
