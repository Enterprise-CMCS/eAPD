import { shallow } from 'enzyme';
import React from 'react';

import { Section, Subsection } from './Section';

describe('Section component', () => {
  test('renders correctly with no resource', () => {
    const component = shallow(<Section>test child</Section>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with resource containing title and helptext', () => {
    const component = shallow(<Section resource="apd">apd test child</Section>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with resource containing title but no helptext', () => {
    const component = shallow(
      <Section resource="activities.outcomes">outcomes test child</Section>
    );
    expect(component).toMatchSnapshot();
  });
});

describe('Subsection component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <Subsection resource="activities.outcomes">test child</Subsection>
    );
    expect(component).toMatchSnapshot();
  });

  test('uses the passed-in heading class', () => {
    const component = shallow(
      <Subsection headerClassName="bobs-burgers" resource="activities.outcomes">
        test child
      </Subsection>
    );
    expect(component).toMatchSnapshot();
  });
});
