import { shallow } from 'enzyme';
import React from 'react';

import ProposedBudget from './ProposedBudget';

describe('ProposedBudget component', () => {
  test('renders correctly', () => {
    const component = shallow(<ProposedBudget />);
    expect(component).toMatchSnapshot();
  });
});
