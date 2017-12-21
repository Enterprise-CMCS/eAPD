import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Hello from './Hello';

configure({ adapter: new Adapter() });

describe('the Hello component', () => {
  test('renders with a default name', () => {
    const component = shallow(<Hello />);
    expect(component).toMatchSnapshot();
  });

  test('renders with a provided name ', () => {
    const component = shallow(<Hello name="Test Person" />);
    expect(component).toMatchSnapshot();
  });
});
