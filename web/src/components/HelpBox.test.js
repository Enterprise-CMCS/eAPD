import { shallow } from 'enzyme';
import React from 'react';

import HelpBox from './HelpBox';

describe('HelpBox component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <HelpBox>
        <div className="test child" />
      </HelpBox>
    );
    expect(component).toMatchSnapshot();
  });
});
