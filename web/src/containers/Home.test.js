import { shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import Home, { Pure } from './Home';

const mockStore = configureMockStore([]);
const initState = { counter: 0 };

describe('the Connected Home component', () => {
  const props = {
    store: mockStore(initState)
  };

  test('renders correctly', () => {
    const component = shallow(<Home {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('the Pure Home component', () => {
  const props = {
    actions: {
      increment: jest.fn(),
      decrement: jest.fn(),
      goToHelloPage: jest.fn()
    },
    total: 5
  };

  test('renders correctly', () => {
    const component = shallow(<Pure {...props} />);
    expect(component).toMatchSnapshot();
  });
});
