import { shallow } from 'enzyme';
import React from 'react';

import SectionHeader from './SectionHeader';

describe('Routes component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <SectionHeader>
        <div className="test child" />
      </SectionHeader>
    );
    expect(component).toMatchSnapshot();
  });
});
