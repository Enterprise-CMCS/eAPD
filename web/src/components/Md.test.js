import { shallow } from 'enzyme';
import React from 'react';

import Md from './Md';

describe('Md component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Md content="# This is markdown" wrapper="div" />
    );
    expect(component).toMatchSnapshot();
  });
});
