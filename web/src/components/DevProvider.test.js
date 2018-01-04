import React from 'react';
import renderer from 'react-test-renderer';

import DevProvider from './DevProvider';

describe('the DevProvider component', () => {
  const props = { children: <div>foo</div> };

  test('renders correctly', () => {
    const tree = renderer.create(<DevProvider {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
