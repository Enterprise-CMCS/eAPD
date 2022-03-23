import { shallow } from 'enzyme';
import React from 'react';

import Sidebar from './Sidebar';

describe('Sidebar component', () => {
  const props = {
    place: { id: 'place id', name: 'place name' }
  };

  it('renders correctly', () => {
    const component = shallow(<Sidebar {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('uses the PNG file extension for territories (these are not SVGs)', () => {
    const component = shallow(
      <Sidebar {...props} place={{ id: 'vi', name: 'U.S. Virgin Islands' }} />
    );
    const img = component.find('img');
    expect(img.prop('src').endsWith('.png')).toBeTruthy();
  });
});
