import React from 'react';
import renderer from 'react-test-renderer';

import Demo from './Demo';

describe('the Demo component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Demo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
