import { shallow } from 'enzyme';
import React from 'react';

import {
  Section,
  SectionDesc,
  SectionTitle,
  Subsection,
  SubsectionChunk
} from './Section';

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

describe('SectionDesc component', () => {
  test('renders correctly', () => {
    const component = shallow(<SectionDesc>test child</SectionDesc>);
    expect(component).toMatchSnapshot();
  });
});

describe('SectionTitle component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <SectionTitle>
        <div className="test child" />
      </SectionTitle>
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

describe('SubsectionChunk component', () => {
  test('renders correctly with no resource', () => {
    const component = shallow(<SubsectionChunk>test child</SubsectionChunk>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with a resource with a subheader', () => {
    const component = shallow(
      <SubsectionChunk resource="activities.goals">test child</SubsectionChunk>
    );
    expect(component).toMatchSnapshot();
  });
});
