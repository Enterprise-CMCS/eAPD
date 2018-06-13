import { shallow } from 'enzyme';
import React from 'react';

import { Chunk, Section, Subsection } from './Section';

describe('Chunk component', () => {
  test('renders correctly with no resource', () => {
    const component = shallow(<Chunk>test child</Chunk>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with a resource with a subheader', () => {
    const component = shallow(
      <Chunk resource="activities.goals">test child</Chunk>
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Section component', () => {
  test('renders correctly with no resource', () => {
    const component = shallow(<Section>test child</Section>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with resource containing title, subheader, and helptext', () => {
    const component = shallow(
      <Section resource="activities.goals">test child</Section>
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Subsection component', () => {
  test('renders correctly', () => {
    const component = shallow(<Subsection>test child</Subsection>);
    expect(component).toMatchSnapshot();
  });
});
