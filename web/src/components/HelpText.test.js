import { shallow } from 'enzyme';
import React from 'react';

import HelpText from './HelpText';

describe('HelpText component', () => {
  test('renders correctly if title and reminder are emtpy', () => {
    const component = shallow(<HelpText text="something made up" />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if title is not-empty but reminder is', () => {
    const component = shallow(<HelpText text="title" />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if reminder is not-empty but title is', () => {
    const component = shallow(
      <HelpText text="something made up" reminder="title" />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if title and reminder are not-empty', () => {
    const component = shallow(<HelpText text="title" reminder="title" />);
    expect(component).toMatchSnapshot();
  });
});
