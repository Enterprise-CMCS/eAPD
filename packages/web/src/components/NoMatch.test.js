import { shallow } from 'enzyme';
import React from 'react';

import NoMatch from './NoMatch';

describe('NoMatch component', () => {
  test('renders correctly', () => {
    const component = shallow(<NoMatch />);
    expect(component).toMatchSnapshot();
  });
});
