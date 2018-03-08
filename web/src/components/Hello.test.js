import { shallow } from 'enzyme';
import React from 'react';

import Hello from './Hello';

describe('the Hello component', () => {
  test('renders correctly', () => {
    const component = shallow(<Hello />);
    expect(component).toMatchSnapshot();
  });
});
