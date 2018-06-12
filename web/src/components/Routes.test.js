import { shallow } from 'enzyme';
import React from 'react';

import Routes from './Routes';

describe('Routes component', () => {
  test('renders correctly', () => {
    const component = shallow(<Routes />);
    expect(component).toMatchSnapshot();
  });
});
