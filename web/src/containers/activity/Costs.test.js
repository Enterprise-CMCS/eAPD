import { shallow } from 'enzyme';
import React from 'react';

import Costs from './Costs';

describe('activity costs wrapper (around personnel and non-personnel) ', () => {
  it('renders properly', () => {
    expect(
      shallow(<Costs activityIndex="activity index" aKey="activity key" />)
    ).toMatchSnapshot();
  });
});
