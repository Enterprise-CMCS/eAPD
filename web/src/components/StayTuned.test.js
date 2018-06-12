import { shallow } from 'enzyme';
import React from 'react';

import StayTuned from './StayTuned';

describe('StayTuned component', () => {
  test('renders correctly', () => {
    const component = shallow(<StayTuned />);
    expect(component).toMatchSnapshot();
  });
});
