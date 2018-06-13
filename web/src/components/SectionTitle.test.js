import { shallow } from 'enzyme';
import React from 'react';

import SectionTitle from './SectionTitle';

describe('SectionTitle component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <SectionTitle>
        <div className="test child" />
      </SectionTitle>
    );
    expect(component).toMatchSnapshot();
  });
});
