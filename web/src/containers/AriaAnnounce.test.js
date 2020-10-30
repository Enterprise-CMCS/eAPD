import { shallow } from 'enzyme';
import React from 'react';
import { plain as AriaAnnounce } from './AriaAnnounce';

describe('aria announce component', () => {
  it('renders correctly', () => {
    const component = shallow(<AriaAnnounce />);
    expect(component).toMatchSnapshot();
  });

  it('renders a message', () => {
    const props = {
      ariaMessage: 'No. No. No. No.'
    };
    const component = shallow(<AriaAnnounce props={props} />);
    expect(component).toMatchSnapshot();
  });
});
