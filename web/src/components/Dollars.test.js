import { shallow } from 'enzyme';
import React from 'react';

import Dollars from './Dollars';

describe('Dollars component', () => {
  test('renders correctly with default props', () => {
    const component = shallow(<Dollars value={2356.233} />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with cents disabled', () => {
    const component = shallow(<Dollars value={2356.233} hideCents />);
    expect(component).toMatchSnapshot();
  });
});
