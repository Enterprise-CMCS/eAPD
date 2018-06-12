import { shallow } from 'enzyme';
import React from 'react';

import SectionDesc from './SectionDesc';

describe('SectionDesc component', () => {
  test('renders correctly', () => {
    const component = shallow(<SectionDesc>test child</SectionDesc>);
    expect(component).toMatchSnapshot();
  });
});
