import { shallow } from 'enzyme';
import React from 'react';

import Counter from './Counter';

describe('the Counter component', () => {
  const props = {
    total: 5,
    onIncrement: jest.fn(),
    onDecrement: jest.fn()
  };

  test('renders correctly', () => {
    const component = shallow(<Counter {...props} />);
    expect(component).toMatchSnapshot();
  });
});
