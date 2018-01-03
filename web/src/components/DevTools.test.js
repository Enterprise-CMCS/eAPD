import React from 'react';
import renderer from 'react-test-renderer';

import DevTools from './DevTools';

describe('the DevTools component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<DevTools />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
