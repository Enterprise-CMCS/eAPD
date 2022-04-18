import { shallow } from 'enzyme';
import React from 'react';

import App from './App';

describe('App component', () => {
  test('renders correctly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
