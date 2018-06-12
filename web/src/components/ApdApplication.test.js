import { shallow } from 'enzyme';
import React from 'react';

import ApdApplication from './ApdApplication';

describe('ApdApplication component', () => {
  test('renders correctly', () => {
    const component = shallow(<ApdApplication />);
    expect(component).toMatchSnapshot();
  });
});
