import { shallow } from 'enzyme';
import React from 'react';

import Md from './Md';

describe('Md component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Md content="# This is markdown" wrapper="div" />
    );
    expect(component).toMatchSnapshot();
  });

  test('handles converting custom formatting', () => {
    const plainList = `This is some content.
    [ol]
    first ordered item
    
    second ordered item
    
    third ordered item
    [/ol]

    [ul]
    first unordered item

    second unordered item

    third unordered item
    [/ul]`;

    expect(shallow(<Md content={plainList} wrapper="div" />)).toMatchSnapshot();
  });

  test('ignores [format] blocks that it does not understand', () => {
    const contentWithUnknownFormatBlock = `This is some content.
    [unknown]
    first item
        
    second item

    third item
    [/unknown]`;

    expect(
      shallow(<Md content={contentWithUnknownFormatBlock} wrapper="div" />)
    ).toMatchSnapshot();
  });
});
