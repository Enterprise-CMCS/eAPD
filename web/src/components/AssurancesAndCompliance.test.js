import { shallow } from 'enzyme';
import React from 'react';

import AssurancesAndCompliance from './AssurancesAndCompliance';

describe('AssurancesAndCompliance component', () => {
  test('renders correctly', () => {
    const component = shallow(<AssurancesAndCompliance />);
    expect(component).toMatchSnapshot();
  });
});
